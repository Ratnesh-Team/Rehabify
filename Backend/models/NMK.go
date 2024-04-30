package models

// NMK represents the structure of a Nasha Mukti Kendra.
type NMK struct {
	ID            string `json:"_id" bson:"_id,omitempty"`
	Name          string `json:"Name" bson:"Name"`
	Address       string `json:"Address" bson:"Address"`
	NMKCode       string `json:"NMK_Code" bson:"NMK_Code"`
	OwnerName     string `json:"Owner_Name" bson:"Owner_Name"`
	ContactNumber  int `json:"Contact_Number,omitempty" bson:"Contact_Number,omitempty"`
	Email         string `json:"Email,omitempty" bson:"Email,omitempty"`
	ImageURL      string `json:"ImageURL" bson:"ImageURL"`
	State      string `json:"State" bson:"State"`
	District      string `json:"District" bson:"District"`
	Pincode      int `json:"Pincode" bson:"Pincode"`
	IsVerified    bool `json:"IsVerified" bson:"IsVerified"`
	EstablishedYear  string `json:"Established_Year" bson:"Established_Year"`
	NMK_Image     string `json:"NMK_Image" bson:"NMK_Image"`
	NMK_Verification_Image string `json:"NMK_Verification_Image" bson:"NMK_Verification_Image"`
}
