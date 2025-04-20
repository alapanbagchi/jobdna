package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Environment   string
	Server        ServerConfig
	Database      DatabaseConfig
	JWT           JWTConfig
	SessionSecret string
	Redis         RediStore
	Domain        string
}

type ServerConfig struct {
	Port int
}

type RediStore struct {
	Host     string
	Port     int
	Password string
	DB       int
}

type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
	SSLMode  string
}

type JWTConfig struct {
	Secret string
	Expiry int // in hours
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func getEnvAsInt(key string, fallback int) int {
	strValue := getEnv(key, "")
	value, err := strconv.Atoi(strValue)
	if err != nil {
		return fallback
	}
	return value
}

func Load() (*Config, error) {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found, proceeding with environment variables only.")
	}

	cfg := &Config{
		Environment: getEnv("APP_ENV", "development"),
		Server: ServerConfig{
			Port: getEnvAsInt("SERVER_PORT", 8000),
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "root"),
			Name:     getEnv("DB_NAME", "jobdna"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
		JWT: JWTConfig{
			Secret: getEnv("JWT_SECRET", "default-secret-key"),
			Expiry: getEnvAsInt("JWT_EXPIRY", 24),
		},
		SessionSecret: getEnv("SESSION_SECRET", "default-secret-key"),
		Redis: RediStore{
			Host:     getEnv("REDIS_HOST", "localhost"),
			Port:     getEnvAsInt("REDIS_PORT", 6379),
			Password: getEnv("REDIS_PASSWORD", ""),
			DB:       getEnvAsInt("REDIS_DB", 0),
		},
		Domain: getEnv("DOMAIN", "localhost"),
	}

	if cfg.JWT.Secret == "default-secret-key" && cfg.Environment == "production" {
		return nil, fmt.Errorf("JWT_SECRET must be set in production")
	}

	if cfg.SessionSecret == "default-secret-key" && cfg.Environment == "production" {
		return nil, fmt.Errorf("SESSION_SECRET must be set in production")
	}

	return cfg, nil
}

func (d *DatabaseConfig) ConnectionString() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		d.Host, d.Port, d.User, d.Password, d.Name, d.SSLMode)
}

func (d *RediStore) ConnectionString() string {
	return fmt.Sprintf("rediss://default:%s@%s:%d", d.Password, d.Host, d.Port)
}
