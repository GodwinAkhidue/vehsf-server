import express from "express";
import get_some from "./get-all/route.js";

const news_and_blogs = express();
news_and_blogs.use("", get_some);

export default news_and_blogs;