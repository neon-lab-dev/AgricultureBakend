import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/user.js";

export const userRegister = catchAsyncError(async (req, res, next) => {
  const {
    name,
    contact_number,
    address,
    income,
    crops_harvest,
    land_area,
    domestic_animal,
    animal_count,
  } = req.body;

  if (
    !name ||
    !contact_number ||
    !address ||
    !income ||
    !crops_harvest ||
    !land_area ||
    !domestic_animal
  )
    return next(new ErrorHandler("Please Enter All Field", 400));

  await User.create({
    name,
    contact_number,
    address,
    income,
    crops_harvest,
    land_area,
    domestic_animal,
    animal_count,
  });

  res.status(201).json({
    success: true,
    message: "Thank you your details is submitted",
  });
});

//Get all Product---Admin/user
export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  const counts = await User.countDocuments({});

  res.status(200).json({
    success: true,
    counts,
    users,
  });
});
