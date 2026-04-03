import mongoose, { Document, Schema } from 'mongoose'

export interface IAuthUser extends Document {
  Username: string
  Password: string
  Email: string
  Role: string
  un?: string
}

const AuthUserSchema = new Schema<IAuthUser>(
  {
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Role: { type: String, required: true, default: 'user' },
    un: { type: String },
  },
  {
    collection: 'authDB',
    timestamps: false,
  }
)

export const AuthUser =
  mongoose.models.AuthUser || mongoose.model<IAuthUser>('AuthUser', AuthUserSchema)
