import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Query_Psql_DB } from "../../../config/psql_config.js";

dotenv.config();

const validateSession = express();
validateSession.use(express.json());

validateSession.get(`/api/auth/validateSession`, async (req, res) => {
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

  if (!details.id) {
    return logout();
  }

  const query = `
    SELECT email, role, firstname, lastname, profile_picture, skills, availability
    FROM users
    WHERE id = $1
    LIMIT 1;
  `;

  const values = [details.id];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const user = result.rows[0];

  return res.status(200).json({ success: true, user });
});

export default validateSession;
