import express from "express";
import add from "./add/route.js";
import delete_post from "./delete/route.js";

const news_and_blogs = express();
news_and_blogs.use("", add);
news_and_blogs.use("", delete_post);

export default news_and_blogs;