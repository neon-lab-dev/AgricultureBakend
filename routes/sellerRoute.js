import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
import { getAllSeller, registerSeller, verify } from "../controllers/sellerController.js";

const router = express.Router();

//register
router.route("/registerseller").post(registerSeller);

router.route("/verifyseller").post(verify);

//get all users--Admin
router.route("/admin/seller").get(isAuthenticated, getAllSeller);





export default router;
