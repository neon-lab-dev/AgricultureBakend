import express from "express";
import singleUpload from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";
import { createProduct, deleteProduct, getAllProduct, getsingleProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

//create Product---Admin
router.route("/createproduct").post(isAuthenticated,singleUpload, createProduct);

// get all products---Admin/user
router.route("/products").get(getAllProduct);

//get/update single product---Admin
router
  .route("/product/:id")
  .get(getsingleProduct)
  .put(isAuthenticated,singleUpload, updateProduct)
  .delete(isAuthenticated,deleteProduct);

export default router;
