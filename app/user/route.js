import express from "express";
import update from "./update/route.js";

const user = express();
user.use(express.json());
user.use("", update);

export default user;
