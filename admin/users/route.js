import express from "express";
import get_some from "./get-some/route.js";
import get_count from "./get-count/route.js";

const users = express();
users.use("", get_some);
users.use("", get_count);

export default users;
