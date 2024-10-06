// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: user_query.sql

package project

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
    name, age, gender, state, district, guardian_name, addiction_type, 
    addiction_duration, duration_of_treatment, is_treatment_completed, 
    under_treatment, employment_status, nasha_mukti_centre_name, 
    nasha_mukti_centre_address, nasha_mukti_centre_code, joining_date, 
    counselling_count, counsellor_name
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
)
RETURNING id, name, age, gender, state, district, guardian_name, addiction_type, addiction_duration, duration_of_treatment, is_treatment_completed, under_treatment, employment_status, nasha_mukti_centre_name, nasha_mukti_centre_address, nasha_mukti_centre_code, joining_date, counselling_count, counsellor_name
`

type CreateUserParams struct {
	Name                    string
	Age                     int32
	Gender                  sql.NullString
	State                   sql.NullString
	District                sql.NullString
	GuardianName            sql.NullString
	AddictionType           sql.NullString
	AddictionDuration       sql.NullInt32
	DurationOfTreatment     sql.NullInt32
	IsTreatmentCompleted    sql.NullBool
	UnderTreatment          sql.NullBool
	EmploymentStatus        sql.NullInt32
	NashaMuktiCentreName    sql.NullString
	NashaMuktiCentreAddress sql.NullString
	NashaMuktiCentreCode    sql.NullString
	JoiningDate             sql.NullTime
	CounsellingCount        sql.NullInt32
	CounsellorName          sql.NullString
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Name,
		arg.Age,
		arg.Gender,
		arg.State,
		arg.District,
		arg.GuardianName,
		arg.AddictionType,
		arg.AddictionDuration,
		arg.DurationOfTreatment,
		arg.IsTreatmentCompleted,
		arg.UnderTreatment,
		arg.EmploymentStatus,
		arg.NashaMuktiCentreName,
		arg.NashaMuktiCentreAddress,
		arg.NashaMuktiCentreCode,
		arg.JoiningDate,
		arg.CounsellingCount,
		arg.CounsellorName,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Age,
		&i.Gender,
		&i.State,
		&i.District,
		&i.GuardianName,
		&i.AddictionType,
		&i.AddictionDuration,
		&i.DurationOfTreatment,
		&i.IsTreatmentCompleted,
		&i.UnderTreatment,
		&i.EmploymentStatus,
		&i.NashaMuktiCentreName,
		&i.NashaMuktiCentreAddress,
		&i.NashaMuktiCentreCode,
		&i.JoiningDate,
		&i.CounsellingCount,
		&i.CounsellorName,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteUser, id)
	return err
}

const getUser = `-- name: GetUser :one
SELECT id, name, age, gender, state, district, guardian_name, addiction_type, addiction_duration, duration_of_treatment, is_treatment_completed, under_treatment, employment_status, nasha_mukti_centre_name, nasha_mukti_centre_address, nasha_mukti_centre_code, joining_date, counselling_count, counsellor_name FROM users 
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetUser(ctx context.Context, id uuid.UUID) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Age,
		&i.Gender,
		&i.State,
		&i.District,
		&i.GuardianName,
		&i.AddictionType,
		&i.AddictionDuration,
		&i.DurationOfTreatment,
		&i.IsTreatmentCompleted,
		&i.UnderTreatment,
		&i.EmploymentStatus,
		&i.NashaMuktiCentreName,
		&i.NashaMuktiCentreAddress,
		&i.NashaMuktiCentreCode,
		&i.JoiningDate,
		&i.CounsellingCount,
		&i.CounsellorName,
	)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT id, name, age, gender, state, district, guardian_name, addiction_type, addiction_duration, duration_of_treatment, is_treatment_completed, under_treatment, employment_status, nasha_mukti_centre_name, nasha_mukti_centre_address, nasha_mukti_centre_code, joining_date, counselling_count, counsellor_name FROM users
ORDER BY name
`

func (q *Queries) ListUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Age,
			&i.Gender,
			&i.State,
			&i.District,
			&i.GuardianName,
			&i.AddictionType,
			&i.AddictionDuration,
			&i.DurationOfTreatment,
			&i.IsTreatmentCompleted,
			&i.UnderTreatment,
			&i.EmploymentStatus,
			&i.NashaMuktiCentreName,
			&i.NashaMuktiCentreAddress,
			&i.NashaMuktiCentreCode,
			&i.JoiningDate,
			&i.CounsellingCount,
			&i.CounsellorName,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateUser = `-- name: UpdateUser :exec
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
WHERE id = $1
`

type UpdateUserParams struct {
	ID                      uuid.UUID
	Name                    string
	Age                     int32
	Gender                  sql.NullString
	State                   sql.NullString
	District                sql.NullString
	GuardianName            sql.NullString
	AddictionType           sql.NullString
	AddictionDuration       sql.NullInt32
	DurationOfTreatment     sql.NullInt32
	IsTreatmentCompleted    sql.NullBool
	UnderTreatment          sql.NullBool
	EmploymentStatus        sql.NullInt32
	NashaMuktiCentreName    sql.NullString
	NashaMuktiCentreAddress sql.NullString
	NashaMuktiCentreCode    sql.NullString
	JoiningDate             sql.NullTime
	CounsellingCount        sql.NullInt32
	CounsellorName          sql.NullString
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) error {
	_, err := q.db.ExecContext(ctx, updateUser,
		arg.ID,
		arg.Name,
		arg.Age,
		arg.Gender,
		arg.State,
		arg.District,
		arg.GuardianName,
		arg.AddictionType,
		arg.AddictionDuration,
		arg.DurationOfTreatment,
		arg.IsTreatmentCompleted,
		arg.UnderTreatment,
		arg.EmploymentStatus,
		arg.NashaMuktiCentreName,
		arg.NashaMuktiCentreAddress,
		arg.NashaMuktiCentreCode,
		arg.JoiningDate,
		arg.CounsellingCount,
		arg.CounsellorName,
	)
	return err
}
