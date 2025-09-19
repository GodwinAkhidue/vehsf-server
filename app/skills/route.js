import express from "express";
import create from "./create/route.js";
import get_all from "./get-all/route.js";
import remove from "./delete/route.js";

const skills = express();
skills.use(express.json());
skills.use("/", create);
skills.use("/", get_all);
skills.use("/", remove);

export default skills;
