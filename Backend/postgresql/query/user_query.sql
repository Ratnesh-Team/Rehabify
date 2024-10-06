-- name: GetUser :one
SELECT * FROM users 
WHERE id = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY name;

-- name: CreateUser :one
INSERT INTO users (
    name, age, gender, state, district, guardian_name, addiction_type, 
    addiction_duration, duration_of_treatment, is_treatment_completed, 
    under_treatment, employment_status, nasha_mukti_centre_name, 
    nasha_mukti_centre_address, nasha_mukti_centre_code, joining_date, 
    counselling_count, counsellor_name
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
)
RETURNING *;

-- name: UpdateUser :exec
UPDATE users
SET 
    name = $2, 
    age = $3, 
    gender = $4, 
    state = $5, 
    district = $6, 
    guardian_name = $7, 
    addiction_type = $8, 
    addiction_duration = $9, 
    duration_of_treatment = $10, 
    is_treatment_completed = $11, 
    under_treatment = $12, 
    employment_status = $13, 
    nasha_mukti_centre_name = $14, 
    nasha_mukti_centre_address = $15, 
    nasha_mukti_centre_code = $16, 
    joining_date = $17, 
    counselling_count = $18, 
    counsellor_name = $19
WHERE id = $1;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;