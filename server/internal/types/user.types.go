package types

type User struct {
	ID        string
	FirstName string
	LastName  string
	Email     string
	Password  string
}

type RegisterUserRequestType struct {
	Email           string `json:"email"`
	Password        string `json:"password"`
	Role            string `json:"role"`
	ConfirmPassword string `json:"confirmPassword"`
}

type LoginUserRequestType struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
