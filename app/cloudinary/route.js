import express from "express";
import { local_file_path } from "./upload/route.js";
import { public_id } from "./delete/route.js";
import { form_data } from "./upload/route.js";

const cloudinary = express();
cloudinary.use(express.json());
cloudinary.use("/", local_file_path); //Upload to cloudinary using local file path
cloudinary.use("/", public_id); //Delete from cloudinary using public id
cloudinary.use("/", form_data); //Upload to cloudinary using form data

export default cloudinary;
