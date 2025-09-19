import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.JWT_SECRET_KEY;

export default function generateToken(id) {
  return jwt.sign({ id }, key, { expiresIn: "7d" });
}
