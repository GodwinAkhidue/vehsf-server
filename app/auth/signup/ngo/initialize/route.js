import express from "express";
import bcrypt from "bcryptjs";
import { client_url } from "../../../../../constants/client.js";
import axios from "axios";
import { Query_Psql_DB } from "../../../../../config/psql_config.js";

const initialize = express();
initialize.post("/api/auth/signup/ngo/initialize", async (req, res) => {
  const { data, profile_picture, resume_cv } = req.body;

  try {
    const url = `https://api.paystack.co/transaction/initialize`;

    const params = {
      email: data.email,
      amount: 5000 * 100,
      currency: "NGN",
      callback_url: `${client_url}/signup/ngo/create`,
      metadata: {
        firstname: data.firstname,
        lastname: data.lastname
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

    const reference = transaction.data.data.reference;
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const response = await Query_Psql_DB(
      `
      INSERT INTO temp_users (
        email,
        password,
        role,
        firstname,
        lastname,
        phone,
        date_of_birth,
        gender,
        location,
        languages_spoken,
        profile_picture,
        skills,
        resume_cv,
        availability,
        preferred_type_of_volunteering,
        emergency_contact_name,
        emergency_contact_relationship,
        emergency_contact_phone,
        ngo_position,
        ngo_location,
        transactionReference
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      );
    `,
      [
        data.email,
        hashedPassword,
        "ngo",
        data.firstname,
        data.lastname,
        JSON.stringify(data.phone),
        data.date_of_birth,
        data.gender,
        JSON.stringify(data.location),
        JSON.stringify(data.languages_spoken),
        JSON.stringify(profile_picture),
        JSON.stringify(data.skills),
        JSON.stringify(resume_cv),
        data.availability,
        data.preferred_type_of_volunteering,
        data.emergency_contact_name,
        data.emergency_contact_relationship,
        JSON.stringify(data.emergency_contact_phone),
        data.ngo_position,
        JSON.stringify(data.ngo_location),
        reference,
      ]
    );

    const { error } = response;

    if (error) {
      return res.status(200).json({
        success: false,
        message: "Could not signup, please try again shortly",
      });
    }

    const transaction_url = transaction.data.data.authorization_url;

    return res.status(200).json({
      success: true,
      url: transaction_url,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Could not signup, please try again shortly",
    });
  }
});

export default initialize;
