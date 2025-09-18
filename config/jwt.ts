import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key: any = process.env.JWT_SECRET_KEY;

export default function generateToken(id: any) {
  return jwt.sign({ id }, key, { expiresIn: "7d" });
}
