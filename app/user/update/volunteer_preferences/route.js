import express from "express";
import { Query_Psql_DB } from "../../../../config/psql_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const volunteer_preferences = express();
volunteer_preferences.use(express.json());

volunteer_preferences.post(
  `/api/user/update/volunteer-preferences`,
  async (req, res) => {
    const { skills, availability } = req.body;

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
    UPDATE users
    SET skills = $1, availability = $2
    WHERE id = $3;
    `;

    const values = [JSON.stringify(skills), availability, details.id];

    const { error } = await Query_Psql_DB(query, values);

    if (error) {
      return res
        .status(200)
        .json({ success: false, message: "Database Error" });
    }

    return res.status(200).json({ success: true });
  }
);

export default volunteer_preferences;
