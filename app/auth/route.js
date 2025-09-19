import express from "express";
import signup from "./signup/route.js";
import login from "./login/route.js";

const auth = express();
auth.use(express.json());
auth.use("", signup);
auth.use("", login);

export default auth;
