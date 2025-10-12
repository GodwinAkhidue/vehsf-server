import express from "express";
import newHero from "./new/route.js";

const hero = express();
hero.use("", newHero)

export default hero;