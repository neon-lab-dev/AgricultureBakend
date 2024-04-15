import express from "express";
import { getAllUser, userRegister } from "../controllers/user.js";
const router = express.Router();

//submit contact
router.route("/registeruser").post(userRegister);

//get all contact
router.route("/users").get(getAllUser);



export default router;
