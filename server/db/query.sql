-- name: RegisgerUser :one
INSERT INTO auth.users (email, password, role)
VALUES ($1, $2, $3)
RETURNING id, email, role, created_at, updated_at;

-- name: GetUserByEmail :one
SELECT id
FROM auth.users
WHERE email = $1;