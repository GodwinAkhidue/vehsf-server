import express from "express";
import initialize from "./initialize/route.js";
import complete from "./complete/route.js";

const ngo = express();
ngo.use("", initialize);
ngo.use("", complete);

export default ngo;