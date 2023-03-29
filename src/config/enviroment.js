import * as dotenv from 'dotenv'
dotenv.config()

export const mongoUri = process.env.MONGO_URI;
export const mongoURL = process.env.MONGO_URL;
export const mongoSecret = process.env.MONGO_SECRET;
