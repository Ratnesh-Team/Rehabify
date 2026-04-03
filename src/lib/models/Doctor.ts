import mongoose, { Document, Schema } from 'mongoose'

export interface IDoctor extends Document {
  Name: string
  Description: string
  Specialization: string
  ClinicAddress: string
  ContactNumber: number
  Email: string
  ImageURL: string
  Docter_Code: string
  IsVerified: boolean
}

const DoctorSchema = new Schema<IDoctor>(
  {
    Name: String,
    Description: String,
    Specialization: String,
    ClinicAddress: String,
    ContactNumber: Number,
    Email: String,
    ImageURL: String,
    Docter_Code: String,
    IsVerified: { type: Boolean, default: false },
  },
  {
    collection: 'DoctorDB',
    timestamps: false,
  }
)

export const Doctor =
  mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema)
