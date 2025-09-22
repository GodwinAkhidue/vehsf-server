import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import { Query_Psql_DB } from "../../../../../config/psql_config.js";
import { v4 as uuidv4 } from "uuid";
import { client_url } from "../../../../../constants/client.js";

const initialize = express();
initialize.use(express.json());
dotenv.config();

initialize.post(
  `/api/donations/paystack/oneTime/initialize`,
  async (req, res) => {
    const { data } = req.body;

    try {
      const url = `https://api.paystack.co/transaction/initialize`;

      const params = {
        email: data.email,
        amount: Number(data.amount) * 100,
        currency: "NGN",
        callback_url: `${client_url}/donate`,
        metadata: {
          firstname: data.firstname,
          lastname: data.lastname,
          donationPurpose: data.donationPurpose,
          donationType: data.donationType,
        },
      };

      const transaction = await axios.post(url, params, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (transaction.data.status !== true) {
        return res.status(200).json({
          success: false,
          message: "Failed to initialize transaction",
        });
      }

      const id = uuidv4();

      const query = `
        INSERT INTO donations (
          id, 
          amount, 
          donationType,
          donationPurpose, 
          paymentMethod,
          firstname, 
          lastname, 
          email,
          transactionReference,
          status
        ) 
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
        RETURNING id;
      `;

      const reference = transaction.data.data.reference;

      const values = [
        id,
        Number(data.amount),
        data.donationType,
        data.donationPurpose,
        data.paymentMethod,
        data.firstname,
        data.lastname,
        data.email,
        reference,
        "cancelled",
      ];

      const { error, result } = await Query_Psql_DB(query, values);

      if (result && result.rows.length > 0) {
        const donationId = result.rows[0].id;
        const transaction_url = transaction.data.data.authorization_url;

        return res.status(200).json({
          success: true,
          data: {
            id: donationId,
            url: transaction_url,
          },
        });
      }

      return res
        .status(200)
        .json({ success: false, message: "Failed to initialize transaction" });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Failed to initialize transaction",
        err: JSON.stringify(err),
      });
    }
  }
);

export default initialize;
