import express from "express";
import { cloudinary_upload_local_file_path } from "../../../config/cloudinary";
import multer from "multer";

export const local_file_path = express();
local_file_path.use(express.json());

export const form_data = express();
form_data.use(express.json());

const upload = multer({ dest: "uploads/" });

local_file_path.post(
  `/api/cloudinary/upload/local-file-path`,
  async (req, res) => {
    const { filePath } = req.body;

    const response = await cloudinary_upload_local_file_path(filePath);

    if (response.response) {
      const file = {
        public_id: response.response.public_id,
        url: response.response.secure_url,
      };
      return res.status(200).json({ success: true, file });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Failed to upload file, try again" });
    }
  }
);

form_data.post(
  `/api/cloudinary/upload/form-data`,
  upload.single("file"),
  async (req, res) => {
    const file = req.file?.path;

    const response = await cloudinary_upload_local_file_path(file);

    if (response.response) {
      const file = {
        public_id: response.response.public_id,
        url: response.response.secure_url,
      };
      return res.status(200).json({ success: true, file });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Failed to upload file, try again" });
    }
  }
);
