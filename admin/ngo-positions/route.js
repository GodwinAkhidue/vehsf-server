import express from "express";
import create from "./create/route.js";
import remove from "./delete/route.js";

const ngo_positions = express();
ngo_positions.use(express.json());
ngo_positions.use("/", create);
ngo_positions.use("/", remove);

export default ngo_positions;
