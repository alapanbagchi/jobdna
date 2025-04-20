package handler

import (
	"encoding/json"
	"net/http"

	"github.com/alapanbagchi/jobdna/internal/types"
	"github.com/alapanbagchi/jobdna/internal/validator"
	"golang.org/x/crypto/bcrypt"
)

// POST method for registering users
func (h *Handler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req types.RegisterUserRequestType
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ve := validator.ValidateRegisterUserRequest(req)
	if len(ve) > 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ve)
		return
	}

	// Check if the email already exists
	row := h.db.QueryRow("SELECT id FROM auth.users WHERE email = $1", req.Email)
	var existingID string
	if err := row.Scan(&existingID); err == nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("Email already exists")
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error hashing password")
		return
	}

	// Insert user into DB with hashed password
	_, err = h.db.Exec(
		"INSERT INTO auth.users (email, password, role) VALUES ($1, $2, $3)",
		req.Email,
		string(hashedPassword),
		req.Role,
	)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("User registered successfully")
}
func (h *Handler) LoginUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req types.LoginUserRequestType
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ve := validator.ValidateLoginUserRequest(req)
	if len(ve) > 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ve)
		return
	}

	// Get user ID and hashed password
	var userID, hashedPassword, role string
	err = h.db.QueryRow("SELECT id, password, role FROM auth.users WHERE email = $1", req.Email).Scan(&userID, &hashedPassword, &role)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("Invalid email or password")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("Invalid email or password")
		return
	}

	// Set session
	session, _ := h.store.Get(r, "jobdna-session")
	session.Values["authenticated"] = true
	session.Values["userID"] = userID
	session.Values["email"] = req.Email
	session.Values["role"] = role
	session.Save(r, w)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Login successful")
}
