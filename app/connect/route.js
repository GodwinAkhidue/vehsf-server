import express from "express";
import search from "./search/route.js";

const connect = express();
connect.use("", search)

export default connect;