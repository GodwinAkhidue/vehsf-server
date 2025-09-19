import express from "express";
import { cloudinary_delete_by_public_id } from "../../../config/cloudinary.js";

export const public_id = express();
public_id.use(express.json());

public_id.delete(
  `/api/cloudinary/delete/public_id/:public_id`,
  async (req, res) => {
    const { public_id } = req.params;

    const response = await cloudinary_delete_by_public_id(public_id);

    if (response.response) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Could not delete file, try again" });
    }
  }
);
