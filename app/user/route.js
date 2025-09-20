import express from "express";
import profile_card from "./profile_card/route.js";

const user = express();
user.use(express.json());
user.use("", profile_card);

export default user;
