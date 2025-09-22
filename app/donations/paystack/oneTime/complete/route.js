import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Query_Psql_DB } from "../../../../../config/psql_config.js";

dotenv.config();

const complete = express();
complete.use(express.json());

complete.post(`/api/donations/paystack/oneTime/complete`, async (req, res) => {
  const { reference } = req.body;

  try {
    const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(
      reference
    )}`;

    const verify = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (verify.data.status !== true) {
      return res.status(200).json({
        success: false,
        message: "Could not verify payment, please try again",
      });
    }

    const query = `
        UPDATE donations
        SET status = $1
        WHERE transactionReference = $2;
    `;

    const status = verify.data.data.status;

    const values = [status, reference];

    const { error, result } = await Query_Psql_DB(query, values);

    if (result) {
      return res.status(200).json({
        success: true,
      });
    }
  } catch {
    return res.status(200).json({
      success: false,
      message: "Could not verify payment, please try again",
    });
  }
});

export default complete;
