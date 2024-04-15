import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Contact } from "../models/contact.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, contact_number, state, city, message } = req.body;

  if (!name || !contact_number || !state || !city || !message)
    return next(new ErrorHandler("Please Enter All Field", 400));

  await Contact.create({
    name,
    contact_number,
    state,
    city,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Thank you your details is submitted",
  });
});


//Get all Product---Admin/user
export const getAllContact = catchAsyncError(async (req, res, next) => {  
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();
  
    const counts = await Contact.countDocuments({});
  
    res.status(200).json({
      success: true,
      counts,
      contacts,
    });
  });