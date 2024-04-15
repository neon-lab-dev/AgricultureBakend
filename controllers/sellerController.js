import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Seller } from "../models/seller.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";

async function deletesellersWithExpiredOTP() {
  try {
    const currentTime = Date.now();
    await Seller.deleteMany({
      otp_expiry: { $lte: currentTime },
      otp: { $ne: null }, // Exclude sellers who have already verified OTP
    });
  } catch (error) {
    console.error("Error deleting sellers with expired OTP:", error);
  }
}

setInterval(deletesellersWithExpiredOTP, 60 * 1000);

// Register a seller
export const registerSeller = catchAsyncError(async (req, res, next) => {
  const { full_name, store_name, email, address } = req.body;

  if (!full_name || !email || !store_name || !address)
    return next(new ErrorHandler("Please fill all details", 400));

  let seller = await Seller.findOne({ email });

  if (seller) {
    return res
      .status(400)
      .json({ success: false, message: "seller already exists" });
  }

  const otp = Math.floor(Math.random() * 1000000);

  seller = await Seller.create({
    full_name,
    email,
    store_name,
    address,
    otp,
    otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
  });

  console.log(otp)

  const emailMessage = `Dear ${seller.full_name},

  Thank you for choosing Dhanlakshmi Organics! 🏆
  
  We're thrilled to have you on board for the upcoming Java Sport event. To ensure the security of your account and expedite your registration process, please verify your account by entering the following One-Time Password (OTP):
  
  OTP: ${otp}
  
  This OTP is exclusively for you and will expire after a limited time. We encourage you to verify your account promptly to secure your spot at the event.
  
  Should you have any questions or concerns, our dedicated support team is here to assist you every step of the way.
  
  Thank you for your trust in Java Sports. We can't wait to see you in action!
  
  Best regards,
  
  Dhanlakshmi Team 🏅
  `;

  await sendEmail(email, "Verify your account", emailMessage);

  res.status(201).json({
    success: true,
    message: "OTP sent to your email",
  });
});

//verify
export const verify = catchAsyncError(async (req, res, next) => {
  const otp = Number(req.body.otp);

  const user = await Seller.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Seller Doesn't exist", 404));
  }

  if (user.otp !== otp || user.otp_expiry < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid OTP or has been Expired" });
  }

  user.verified = true;
  user.otp = null;
  user.otp_expiry = null;

  await user.save();

  res.status(201).json({
    success: true,
    message: "Thank you For your Registration, We Will contact you Soon",
  });
});

// Get all users(admin)
export const getAllSeller = catchAsyncError(async (req, res, next) => {
  const userCount = await Seller.countDocuments();
  const users = await Seller.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    userCount,
    users,
  });
});
