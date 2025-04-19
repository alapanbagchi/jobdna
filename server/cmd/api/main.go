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
)

func main() {
	// Loading the configuration file
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to the database
	db, err := database.Connect(cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to databasae: %v", err)
	}
	defer db.Close()

	// Creating a new router
	router := http.NewServeMux()

	// Initializing API handlers
	h := handler.NewHandler(db)

	// Registering all the routes
	registerRoutes(router, h, middleware.ChainMiddleware(
		middleware.Logger,
		middleware.Cors,
		middleware.Recovery,
	))

	// Configure the HTTP server
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Server.Port),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Starting the server in a goroutine
	go func() {
		log.Printf("Starting server on port %d", cfg.Server.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a deadline for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
	log.Println("Server exiting")
}

func registerRoutes(mux *http.ServeMux, h *handler.Handler, middleware func(http.Handler) http.Handler) {
	// Health check
	mux.Handle("/health", middleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})))

}
