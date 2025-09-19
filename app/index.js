import express from "express";
import Create_Tables from "./create_tables/route.js";
import skills from "./skills/route.js";
import cloudinary from "./cloudinary/route.js";
import auth from "./auth/route.js";
import user from "./user/route.js";

const root = express();
root.use(express.json());
root.use("/", skills);
root.use("/", cloudinary);
root.use("/", auth);
root.use("/", user);

root.get(`/`, async (_, res) => {
  const create_tables = await Create_Tables();

  if (!create_tables) {
    return res.send("Something went wrong, please reload the page");
  }

  return res.send("All tables created successfully");
});

export default root;
