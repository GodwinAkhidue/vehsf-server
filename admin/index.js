import express from "express";
import auth from "./auth/route.js";
import skills from "./skills/route.js";
import AdminShield from "./auth/adminShield/route.js";
import users from "./users/route.js";

const admin = express();
admin.use(express.json());
admin.use("", auth);
admin.use("", AdminShield, skills);
admin.use("", AdminShield, users);

export default admin;
