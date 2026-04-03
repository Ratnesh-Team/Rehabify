import mongoose, { Document, Schema } from 'mongoose'

export interface IHomeRemedy extends Document {
  id: number
  category: string
  title: string
  content: string
  body: string
  image: string
  author: string
  date: string
}

const HomeRemedySchema = new Schema<IHomeRemedy>(
  {
    id: Number,
    category: String,
    title: String,
    content: String,
    body: String,
    image: String,
    author: String,
    date: String,
  },
  {
    collection: 'Home-Remedies',
    timestamps: false,
  }
)

export const HomeRemedy =
  mongoose.models.HomeRemedy ||
  mongoose.model<IHomeRemedy>('HomeRemedy', HomeRemedySchema)
