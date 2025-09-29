import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";

const updatePassword = express();
updatePassword.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: { error: "Too many requests, try again in 1 minute" },
});

updatePassword.post(`/api/auth/updatePassword`, limiter, async (req, res) => {
  const { email, code, password } = req.body;

  const query = `
        SELECT verification_code, verification_code_expiry, verification_code_used
        FROM users
        WHERE email = $1`;

  const values = [email];

  const info = await Query_Psql_DB(query, values);

  if (info.error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const storedCode = info.result.rows[0].verification_code;

  if (code !== storedCode) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid verification code" });
  }

  const codeExpiry = info.result.rows[0].verification_code_expiry;
  const currentTime = Date.now();

  if (currentTime > codeExpiry) {
    return res
      .status(200)
      .json({ success: false, message: "Verification code has expired" });
  }

  const used = info.result.rows[0].verification_code_used;

  if (used === true) {
    return res
      .status(200)
      .json({ success: false, message: "Code has already been used" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const query2 = `
    UPDATE users
    SET password = $1, verification_code_used = $2
    WHERE email = $3
  `;

  const values2 = [hashedPassword, true, email];

  const { error, result } = await Query_Psql_DB(query2, values2);

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Database Error: Password could not be updated",
    });
  }

  return res.status(200).json({ success: true });
});

export default updatePassword;
