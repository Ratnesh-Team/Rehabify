package models


// User represents the structure of a user in the system.
type User struct {
	ID                  string    `json:"_id" bson:"_id,omitempty"`
	Name                string    `json:"Name" bson:"Name"`
	Age                 int       `json:"Age" bson:"Age"`
	Gender              string    `json:"Gender" bson:"Gender"`
	State               string    `json:"State" bson:"State"`
	District            string    `json:"District" bson:"District"`
	GuardianName        string    `json:"Guardian_Name" bson:"Guardian_Name"`
	AddictionType       string    `json:"Addiction_Type" bson:"Addiction_Type"`
	AddictionDuration   int       `json:"Addiction_Duration" bson:"Addiction_Duration"`
	DurationOfTreatment int       `json:"Duration_of-Treatment" bson:"Duration_of-Treatment"`
	IsTreatmentCompleted bool      `json:"Is_Treatment_Completed" bson:"Is_Treatment_Completed"`
	UnderTreatment      bool      `json:"Under_Treatment" bson:"Under_Treatment"`
	EmploymentStatus    int       `json:"Employment_Status" bson:"Employment_Status"`
	NashaMuktiCentreName string    `json:"Nasha_Mukti_Centre_Name" bson:"Nasha_Mukti_Centre_Name"`
	NashaMuktiCentreAddress string `json:"Nasha_Mukti_Centre_Address" bson:"Nasha_Mukti_Centre_Address"`
	NashaMuktiCentreCode string    `json:"Nasha_Mukti_Centre_Code" bson:"Nasha_Mukti_Centre_Code"`
	JoiningDate         string    `json:"Joining_Date" bson:"Joining_Date"`
	CounsellingCount    int       `json:"Counselling_Count" bson:"Counselling_Count"`
	CounsellorName      string    `json:"Counsellor_Name" bson:"Counsellor_Name"`
}
