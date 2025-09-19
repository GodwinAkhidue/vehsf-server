import express from "express";
import signup from "./signup/route";
import login from "./login/route";

const auth = express();
auth.use(express.json());
auth.use("", signup);
auth.use("", login);

export default auth;
