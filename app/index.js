import express from "express";
import Create_Tables from "./create_tables/route.js";
import skills from "./skills/route.js";
import cloudinary from "./cloudinary/route.js";
import auth from "./auth/route.js";
import user from "./user/route.js";
import donations from "./donations/route.js";
import banners from "./banners/route.js";
import news_and_blogs from "./news-and-blogs/route.js";
import explore_impact from "./explore-impact/route.js";
import connect from "./connect/route.js";

const root = express();
root.use(express.json());
root.use("/", skills);
root.use("/", cloudinary);
root.use("/", auth);
root.use("/", user);
root.use("/", donations);
root.use("/", banners);
root.use("/", news_and_blogs);
root.use("/", explore_impact);
root.use("/", connect);

root.get(`/`, async (_, res) => {
  const create_tables = await Create_Tables();

  if (!create_tables) {
    return res.send("Something went wrong, please reload the page");
  }

  return res.send("All tables created successfully");
});

export default root;
