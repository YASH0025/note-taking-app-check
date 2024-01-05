import * as mongoose from 'mongoose'
import { timestamp } from 'rxjs'

export const UsersSchema = new mongoose.Schema(
  {
    password: String,
    fullName: String,
    otpGenerateTime: String,
    accountStatus: String,
    email: String,
    otp: Number,
    isVerified: Boolean
  },
  { timestamps: true }
)
