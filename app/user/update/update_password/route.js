import express from "express";
import { Query_Psql_DB } from "../../../../config/psql_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const update_password = express();
update_password.use(express.json());

update_password.post(`/api/user/update/password`, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const token = req.cookies.authToken;
  const key = process.env.JWT_SECRET_KEY;

  function noLogin() {
    res.status(200).json({ success: false, message: "No login detected" });
  }

  if (!token) {
    return noLogin();
  }

  const details = jwt.verify(token, key);

  if (!details.id) {
    return noLogin();
  }

  const query = `
            SELECT password 
            FROM users 
            WHERE id = $1 
            LIMIT 1;
        `;

  const values = [details.id];

  const result = await Query_Psql_DB(query, values);

  if (result.error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const storedPassword = result.result.rows[0].password;

  const match = await bcrypt.compare(oldPassword, storedPassword);

  if (!match) {
    return res
      .status(200)
      .json({ success: false, message: "Old Password is Incorrect" });
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 12);

  const query2 = `
            UPDATE users
            SET password = $1
            WHERE id = $2;
        `;

  const values2 = [newHashedPassword, details.id];

  const result2 = await Query_Psql_DB(query2, values2);

  if (result2.error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  return res.status(200).json({ success: true });
});

export default update_password;
