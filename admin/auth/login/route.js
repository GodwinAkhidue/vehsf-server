import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";
import bcrypt from "bcryptjs";
import generateToken from "../../../config/jwt.js";

const login = express();
login.use(express.json());

login.post(`/api/admin/login`, async (req, res) => {
  const { email, password } = req.body;

  const query = `
        SELECT id, email, name, password
        FROM admins
        WHERE email = $1
        LIMIT 1;
    `;

  const values = [email];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Database Error",
      error: JSON.stringify(error),
    });
  }

  if (result.rows.length <= 0) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const storedPassword = result.rows[0].password;

  const passwordCheck = await bcrypt.compare(password, storedPassword);

  if (!passwordCheck) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid Credentials" });
  }

  if (passwordCheck) {
    const id = result.rows[0].id;
    const token = generateToken(id);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".vehsf.com",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24, //24 hours
    });

    return res.status(200).json({ success: true });
  }
});

export default login;
