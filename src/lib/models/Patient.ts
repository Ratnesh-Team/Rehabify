import mongoose, { Document, Schema } from 'mongoose'

export interface IPatient extends Document {
  Name: string
  Age: number
  Gender: string
  State: string
  District: string
  Guardian_Name: string
  Addiction_Type: string
  Addiction_Duration: number
  'Duration_of-Treatment': number
  Is_Treatment_Completed: boolean
  Under_Treatment: boolean
  Employment_Status: number
  Nasha_Mukti_Centre_Name: string
  Nasha_Mukti_Centre_Address: string
  Nasha_Mukti_Centre_Code: string
  Joining_Date: string
  Counselling_Count: number
  Counsellor_Name: string
}

const PatientSchema = new Schema<IPatient>(
  {
    Name: String,
    Age: Number,
    Gender: String,
    State: String,
    District: String,
    Guardian_Name: String,
    Addiction_Type: String,
    Addiction_Duration: Number,
    'Duration_of-Treatment': Number,
    Is_Treatment_Completed: Boolean,
    Under_Treatment: Boolean,
    Employment_Status: Number,
    Nasha_Mukti_Centre_Name: String,
    Nasha_Mukti_Centre_Address: String,
    Nasha_Mukti_Centre_Code: String,
    Joining_Date: String,
    Counselling_Count: Number,
    Counsellor_Name: String,
  },
  {
    collection: 'User',
    timestamps: false,
  }
)

export const Patient =
  mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema)
