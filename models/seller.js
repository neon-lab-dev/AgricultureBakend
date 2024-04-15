import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Please Enter Your full Name"],
    maxLength: [30, "Name cannot exceed 30 charcters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  store_name: {
    type: String,
    required: [true, "Please Enter Your store_name"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Your address"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  otp_expiry: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Seller = mongoose.model("Seller", schema);

