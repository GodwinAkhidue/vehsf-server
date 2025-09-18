import express from "express";
import signup from "./signup/route";

const auth = express();
auth.use(express.json());
auth.use("", signup);

export default auth;
