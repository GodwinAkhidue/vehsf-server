import express from "express";
import auth from "./auth/route.js";
import skills from "./skills/route.js";
import AdminShield from "./auth/adminShield/route.js";
import users from "./users/route.js";
import banners from "./banners/route.js";
import news_and_blogs from "./news-and-blogs/route.js";
import explore_impact from "./explore-impact/route.js";

const admin = express();
admin.use(express.json());
admin.use("", auth);
admin.use("", AdminShield, skills);
admin.use("", AdminShield, users);
admin.use("", AdminShield, banners);
admin.use("", AdminShield, news_and_blogs);
admin.use("", AdminShield, explore_impact);

export default admin;
