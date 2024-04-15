import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    index: true,
  },
  contact_number: {
    type:Number,       
    required: [true, "Please Enter your contact number"],
  },
  state: {
    type: String,
    required: [true, "Please Enter state"],
  },
  city: {
    type: String,
    required: [true, "Please Enter city"],
  },
  message:{
    type: String,
    required: [true, "Please enter your message"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: true,
  },
});

export const Contact = mongoose.model("Contact", schema);
