import express from "express";
import hero from "./hero/route.js";

const banners = express();
banners.use("", hero);

export default banners;