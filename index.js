import express from "express";
import cors from "cors";

const app = express();
app.use(cors("https://localhost:3000"));
app.use(express.json());

app.get("/", (req, res) => res.send("VEHSF API running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port 5000 ${PORT}`));
