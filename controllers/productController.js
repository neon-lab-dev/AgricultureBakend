import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Product } from "../models/product.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//create Product---Admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, category, available_packs, price } = req.body;
  const file = req.file;

  if (!name || !description || !category || !available_packs || !file || !price)
    return next(
      new ErrorHandler(
        "Please enter all deatils and provide product image",
        400
      )
    );

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Product.create({
    name,
    description,
    category,
    available_packs,
    price,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Product Created successfully",
  });
});

//Get all Product---Admin/user
export const getAllProduct = catchAsyncError(async (req, res, next) => {
  const name = req.query.name || "";
  const category = req.query.category || "";

  const products = await Product.find({
    name: {
      $regex: name,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  })
    .sort({ createdAt: -1 })
    .lean();

  const counts = await Product.countDocuments({
    name: {
      $regex: name,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    counts,
    products,
  });
});

//Get a product ---Admin
export const getsingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("product not found", 400));

  res.status(200).json({
    success: true,
    product,
  });
});

//delete a doctor ---Admin
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("product not found", 400));

  await cloudinary.v2.uploader.destroy(product.avatar.public_id);

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product Deleted Successfully",
  });
});

// Combined update function for doctor details and profile picture
export const updateProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, category, available_packs, price } = req.body;

  const file = req.file; // Assuming you are using multer or similar middleware for file uploads

  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("product not found", 400));

  // Update textual details
  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (available_packs) product.available_packs = available_packs;
  if (price) product.price = price;

  // Update profile picture
  if (file) {
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(product.avatar.public_id);

    product.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});
