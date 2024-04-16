package models

// Credentials represents user credentials for authentication
type Credentials struct {
	Email    string `json:"Email" bson:"Email"`
	Password string `json:"Password" bson:"Password"`
	Role     string `json:"Role" bson:"Role"`
}
