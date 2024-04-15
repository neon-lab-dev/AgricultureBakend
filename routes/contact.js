import express from "express";
import { contact, getAllContact } from "../controllers/contact.js";
const router = express.Router();

//submit contact
router.route("/contactuser").post(contact);

//get all contact
router.route("/contacts").get(getAllContact);



export default router;
