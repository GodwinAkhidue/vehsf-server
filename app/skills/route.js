import express from "express";
import get_all from "./get-all/route.js";

const skills = express();
skills.use(express.json());
skills.use("/", get_all);

export default skills;
