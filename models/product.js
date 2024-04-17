import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your product name"],
  },
  description: {
    type: String,       
    required: [true, "Please Enter product description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter product category"],
  },
  available_packs: {
    type: String,
    required: [true, "Please Enter available packs"],
  },
  price:{
    type: Number,
    required: [true, "Please Enter price"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: true,
  },
});

export const Product = mongoose.model("Product", schema);
