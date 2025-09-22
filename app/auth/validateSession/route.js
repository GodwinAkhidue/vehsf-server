import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateSession = express();
validateSession.use(express.json());

validateSession.get(`/api/auth/validateSession`, (req, res) => {
  const token = req.cookies.authToken;
  const key = process.env.JWT_SECRET_KEY;

  function logout() {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".vehsf.com",
      path: "/",
    });

    res.status(200).json({ success: false, message: "No login detected" });
  }

  if (!token) {
    return logout();
  }

  const details = jwt.verify(token, key);

  if (details.id) {
    return res.status(200).json({ success: true });
  }

  return logout();
});

export default validateSession;
