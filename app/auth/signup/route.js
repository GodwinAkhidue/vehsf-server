import express from "express";
import ngo from "./ngo/route.js";
import volunteer from "./volunteer/route.js";
import donor from "./donor/route.js";

const signup = express();
signup.use("", ngo);
signup.use("", volunteer);
signup.use("", donor);

export default signup;
