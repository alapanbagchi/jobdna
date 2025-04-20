package handler

import (
	"database/sql"

	"github.com/gorilla/sessions"
)

// handler.go
type Handler struct {
	db    *sql.DB
	store sessions.Store
}

func NewHandler(db *sql.DB, store sessions.Store) *Handler {
	return &Handler{db: db, store: store}
}
