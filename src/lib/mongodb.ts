// Native MongoClient for @auth/mongodb-adapter
// The adapter requires the raw MongoClient, not Mongoose
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the client is not recreated on every hot reload
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  client = new MongoClient(uri, options)
}

export default client
