import express from "express";
import get_some from "./get-some/route.js";
import get_count from "./get-count/route.js";

const donations = express();
donations.use("", get_some)
donations.use("", get_count)

export default donations;