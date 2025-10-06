import jwt from "jsonwebtoken";
import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function AdminShield(req, res, next) {
  const token = req.cookies.authToken;
  const key = process.env.JWT_SECRET_KEY;

  if (!token) {
    return res.status(200).json({ success: false, message: "Access denied" });
  }

  const details = jwt.verify(token, key);

  if (!details.id) {
    return res.status(200).json({ success: false, message: "Access denied" });
  }

  const query = `
            SELECT id
            FROM admins
            WHERE id = $1
            LIMIT 1;
        `;

  const values = [details.id];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  if (result.rows.length <= 0) {
    return res.status(200).json({ success: false, message: "Access denied" });
  }

  next();
}
