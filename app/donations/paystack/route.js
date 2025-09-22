import express from "express";
import oneTime from "./oneTime/route.js";

const paystack = express();
paystack.use(express.json());

paystack.use("", oneTime);

export default paystack;
