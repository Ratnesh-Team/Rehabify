import mongoose, { Document, Schema } from 'mongoose'

export interface INMK extends Document {
  Name: string
  Address: string
  NMK_Code: string
  Owner_Name: string
  Contact_Number?: number
  Email?: string
  ImageURL: string
  State: string
  District: string
  Pincode: number
  IsVerified: boolean
  Established_Year: number
  NMK_Image: string
  NMK_Verification_Image: string
}

const NMKSchema = new Schema<INMK>(
  {
    Name: String,
    Address: String,
    NMK_Code: String,
    Owner_Name: String,
    Contact_Number: Number,
    Email: String,
    ImageURL: String,
    State: String,
    District: String,
    Pincode: Number,
    IsVerified: { type: Boolean, default: false },
    Established_Year: Number,
    NMK_Image: String,
    NMK_Verification_Image: String,
  },
  {
    collection: 'NMK',
    timestamps: false,
  }
)

export const NMK = mongoose.models.NMK || mongoose.model<INMK>('NMK', NMKSchema)
