import express from "express";
import paystack from "./paystack/route.js";

const donations = express();
donations.use(express.json());
donations.use("", paystack);

export default donations;
