import express from "express";
import { config } from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";


config({
  path: "./config/config.env",
});

const app = express();

//using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());



//Importing and using Routes
import admin from "./routes/adminRoute.js";
import product from "./routes/productRoute.js";
import contact from "./routes/contact.js";
import user from "./routes/user.js"
import seller from "./routes/sellerRoute.js"

import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", admin);
app.use("/api/v1", product);
app.use("/api/v1", contact);
app.use("/api/v1", user);
app.use("/api/v1", seller);



export default app;

app.get("/", (req, res) => res.send(`<h1>Welcome To Dhanlakshmi Backend</h1>`));

app.use(ErrorMiddleware);
