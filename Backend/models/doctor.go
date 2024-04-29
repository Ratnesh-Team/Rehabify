package models


// DoctorData is a struct to map the DoctorData model.	
type DoctorData struct {
	ID string `json:"_id" bson:"_id"`
	Name string `json:"Name" bson:"Name"`
	Description string `json:"Description" bson:"Description"`
	Specialization string `json:"Specialization" bson:"Specialization"`
	ClinicAddress string `json:"ClinicAddress" bson:"ClinicAddress"`
	ContactNumber string `json:"ContactNumber" bson:"ContactNumber"`
	Email string `json:"Email" bson:"Email"`
	ImageURL string `json:"ImageURL" bson:"ImageURL"`
	Docter_Code string `json:"Docter_Code" bson:"Docter_Code"`
}

