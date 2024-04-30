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
