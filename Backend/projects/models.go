// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package project

import (
	"database/sql"

	"github.com/google/uuid"
)

type User struct {
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
