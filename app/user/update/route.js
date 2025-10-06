import express from "express";
import profile_picture from "./profile_picture/route.js";
import personal_information from "./personal_information/route.js";
import update_password from "./update_password/route.js";

const update = express();
update.use("", profile_picture);
update.use("", personal_information);
update.use("", update_password);

export default update;
