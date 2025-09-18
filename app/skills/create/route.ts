import express from "express";
import Input_Validator from "./input-validator";
import { Query_Psql_DB } from "../../../config/psql_config";

const create = express();
create.use(express.json());

create.post("/api/admin/skills/create", async (req, res) => {
  const { name } = req.body;

  const valid = Input_Validator(req.body);

  if (valid !== true) {
    return res.status(200).json({ success: false, message: valid });
  }

  const query = `
    INSERT INTO skills (name)
    VALUES ($1);
  `;

  const values = [name];

  const response = await Query_Psql_DB(query, values);
  const { error } = response;

  if (error) {
    if (error.code === "23505") {
      return res.status(200).json({
        success: false,
        message: "A skill with this name already exists",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Could not add skill, please try again shortly",
    });
  }

  return res.status(200).json({ success: true });
});

export default create;
