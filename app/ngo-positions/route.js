import express from "express";
import get_all from "./get-all/route.js";

const ngo_positions = express();
ngo_positions.use(express.json());
ngo_positions.use("/", get_all);

export default ngo_positions;
