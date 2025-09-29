import express from "express";
import signup from "./signup/route.js";
import login from "./login/route.js";
import validateSession from "./validateSession/route.js";
import verificationCode from "./verificationCode/route.js";
import updatePassword from "./updatePassword/route.js";

const auth = express();
auth.use(express.json());
auth.use("", signup);
auth.use("", login);
auth.use("", validateSession);
auth.use("", verificationCode);
auth.use("", updatePassword);

export default auth;
