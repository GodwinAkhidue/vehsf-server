import express from "express";
import add from "./add/route.js";
import delete_post from "./delete/route.js";

const explore_impact = express();
explore_impact.use("", add);
explore_impact.use("", delete_post);

export default explore_impact;