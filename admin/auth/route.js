import express from "express";
import login from "./login/route.js";
import validateSession from "./validateSession/route.js";

const auth = express();
auth.use(express.json());
auth.use("", login);
auth.use("", validateSession);

export default auth;
