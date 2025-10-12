import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Query_Psql_DB } from "../../config/psql_config.js";
import bcrypt from "bcryptjs";

const createAdmin = express();
createAdmin.use(express.json());

createAdmin.get(`/api/createAdmin`, async (req, res) => {
  const id = uuidv4();
  const email = "admin@vehsf.com";
  const password = "eXN0b£5]457k";
  const name = "Admin";

  const hashedpassword = await bcrypt.hash(password, 12);

  const query = `INSERT INTO admins (id, email, password, name) VALUES ($1, $2, $3, $4);`;
  const values = [id, email, hashedpassword, name];

  const { error, result } = await Query_Psql_DB(query, values);

  if (result) {
    return res.status(200).json({ success: true });
  }
});

export default createAdmin;