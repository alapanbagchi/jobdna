package validator

import (
	"regexp"
	"unicode"

	"github.com/alapanbagchi/jobdna/internal/types"
)

// ValidateRegisterUserRequest returns a map of field-specific validation errors.
func ValidateRegisterUserRequest(req types.RegisterUserRequestType) map[string]string {
	ve := make(map[string]string)

	if req.Email == "" {
		ve["email"] = "Email is required"
	} else if !isValidEmail(req.Email) {
		ve["email"] = "Invalid email format"
	}

	if req.Password == "" {
		ve["password"] = "Password is required"
	} else if !isStrongPassword(req.Password) {
		ve["password"] = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
	}

	if req.ConfirmPassword == "" {
		ve["confirmPassword"] = "Confirm password is required"
	} else if req.Password != req.ConfirmPassword {
		ve["confirmPassword"] = "Passwords do not match"
	}

	if req.Role == "" {
		ve["role"] = "Role is required"
	}

	return ve
}

func isValidEmail(email string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(email)
}

func isStrongPassword(password string) bool {
	var hasMinLen, hasUpper, hasLower, hasNumber, hasSpecial bool

	if len(password) >= 8 {
		hasMinLen = true
	}

	for _, c := range password {
		switch {
		case unicode.IsUpper(c):
			hasUpper = true
		case unicode.IsLower(c):
			hasLower = true
		case unicode.IsDigit(c):
			hasNumber = true
		case unicode.IsPunct(c) || unicode.IsSymbol(c):
			hasSpecial = true
		}
	}

	return hasMinLen && hasUpper && hasLower && hasNumber && hasSpecial
}

func ValidateLoginUserRequest(req types.LoginUserRequestType) map[string]string {
	ve := make(map[string]string)

	if req.Email == "" {
		ve["email"] = "Email is required"
	}

	if req.Password == "" {
		ve["password"] = "Password is required"
	}

	return ve
}
