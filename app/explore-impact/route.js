import express from "express";
import get_some from "./get-some/route.js";

const explore_impact = express();
explore_impact.use("", get_some);

export default explore_impact;