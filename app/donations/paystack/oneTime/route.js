import express from "express";
import initialize from "./initialize/route.js";
import complete from "./complete/route.js";

const oneTime = express();
oneTime.use(express.json());

oneTime.use("", initialize);
oneTime.use("", complete);

export default oneTime;
