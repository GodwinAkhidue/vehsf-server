import express from "express";
import create from "./create/route.js";
import remove from "./delete/route.js";

const skills = express();
skills.use(express.json());
skills.use("/", create);
skills.use("/", remove);

export default skills;
