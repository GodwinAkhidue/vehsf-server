import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";
import generateToken from "../../../config/jwt.js";
import bcrypt from "bcryptjs";

const login = express();
login.use(express.json());

login.post(`/api/auth/login`, async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT id, password
         FROM users
         WHERE email = $1;`;
  const values = [email];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res
      .status(200)
      .json({ success: false, message: "Something went wrong, try again" });
  }

  if (result.rows.length <= 0) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const hashedPassword = result.rows[0].password;

  try {
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      const id = result.rows[0].id;
      const token = generateToken(id);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        domain: ".vehsf.com",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 days in milliseconds
      });

      return res.status(200).json({ success: true });
    }
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  } catch {
    return res
      .status(200)
      .json({ success: false, message: "Something went wrong, try again" });
  }
});

export default login;
