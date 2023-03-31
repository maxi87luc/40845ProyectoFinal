import * as dotenv from 'dotenv'
dotenv.config()

export const mongoUri = process.env.MONGO_URI;
export const mongoURL = process.env.MONGO_URL;
export const mongoSecret = process.env.MONGO_SECRET;
export const mymail = process.env.TU_CORREO_ELECTRONICO;
export const mailService = process.env.MAIL_SERVICE;
export const mailPassword = process.env.TU_PASSWORD;
export const accountSid = process.env.ACCOUNT_SID;
export const authToken = process.env.AUTH_TOKEN;
