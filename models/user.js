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
  address: {
    type: String,
    required: [true, "Please Enter Address"],
  },
  income: {
    type: String,
    required: [true, "Please Enter Income"],
  },
  crops_harvest:{
    type: String,
    required: [true, "Please enter your crops_harvest"],
  },
  land_area: {
    type: Number,
    required: [true, "Please Enter land area"],
  },
  domestic_animal:{
    type:String,
    required: [true, "Please Enter domestic animal"],
  },
  animal_count:{
    type:String,    
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: true,
  },
});

export const User = mongoose.model("User", schema);
