import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOURI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'Rehabify'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI (or legacy MONGOURI) inside .env.local')
}

interface Cached {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

type GlobalWithMongoose = typeof globalThis & { mongoose?: Cached }
const globalWithMongoose = globalThis as GlobalWithMongoose

const cached: Cached =
  globalWithMongoose.mongoose ??
  (globalWithMongoose.mongoose = { conn: null, promise: null })

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(mongoose => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
