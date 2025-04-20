package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/alapanbagchi/jobdna/config"
	"github.com/alapanbagchi/jobdna/internal/database"
	"github.com/alapanbagchi/jobdna/internal/handler"
	"github.com/alapanbagchi/jobdna/internal/middleware"
	"github.com/gorilla/sessions"
	"github.com/rbcervilla/redisstore/v9"
	"github.com/redis/go-redis/v9"
)

func main() {
	// Load config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}
	redisConnectionString := cfg.Redis.ConnectionString()
	opt, _ := redis.ParseURL(redisConnectionString)
	client := redis.NewClient(opt)

	// Create RedisStore with context and redis client
	store, err := redisstore.NewRedisStore(context.Background(), client)
	if err != nil {
		log.Fatal("Failed to create redis store:", err)
	}

	// Optional configuration
	store.KeyPrefix("session_")
	store.Options(sessions.Options{
		Path:   "/",
		Domain: cfg.Domain,
		MaxAge: 86400 * 7, // 7 days
	})
	log.Println("Connected to redis")
	// Connect to PostgreSQL
	db, err := database.Connect(cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()
	log.Println("Connected to database")

	// Create router and handlers
	router := http.NewServeMux()
	h := handler.NewHandler(db, store)

	registerRoutes(router, h, middleware.ChainMiddleware(
		middleware.Logger,
		middleware.Cors,
		middleware.Recovery,
	))

	// Setup HTTP server
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Server.Port),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server started on port %d", cfg.Server.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited cleanly")
}

func registerRoutes(mux *http.ServeMux, h *handler.Handler, middleware func(http.Handler) http.Handler) {
	mux.Handle("/health", middleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})))

	base := "/api/v1"
	mux.Handle(base+"/register", middleware(http.HandlerFunc(h.RegisterUser)))
	mux.Handle(base+"/login", middleware(http.HandlerFunc(h.LoginUser)))
}
