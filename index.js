import express from "express";
import cors from "cors";
import { TestDB } from "./test-db.js";

const app = express();
app.use(cors("https://localhost:3000"));
app.use(express.json());

app.get("/", async (req, res) => {
  const val = await TestDB();
  res.send(`running: ${val}`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
