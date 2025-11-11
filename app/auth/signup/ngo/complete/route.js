import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Query_Psql_DB } from "../../../../../config/psql_config.js";
import { v4 as uuidv4 } from "uuid";
import generateToken from "../../../../../config/jwt.js";

dotenv.config();

const complete = express();
complete.use(express.json());

complete.post(`/api/auth/signup/ngo/complete`, async (req, res) => {
  const { reference } = req.body;
  const userid = uuidv4();

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

    const status = verify.data.data.status;

    if (status !== "success") {
      return res.status(200).json({
        success: false,
        message: "Could not verify payment",
      });
    }

    const query = `
        SELECT * FROM temp_users
        WHERE transactionReference = $1;
    `;

    const values = [reference];

    const { error, result } = await Query_Psql_DB(query, values);

    if (error) {
      console.log(error);
      return res.status(200).json({
        success: false,
        message: "Could not verify payment, please try again",
      });
    }

    const data = result.rows[0];

    const response = await Query_Psql_DB(
      `
      INSERT INTO users (
        id,
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
        ngo_location
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      )
      RETURNING id;
    `,
      [
        userid,
        data.email,
        data.password,
        "ngo",
        data.firstname,
        data.lastname,
        JSON.stringify(data.phone),
        data.date_of_birth,
        data.gender,
        JSON.stringify(data.location),
        JSON.stringify(data.languages_spoken),
        JSON.stringify(data.profile_picture),
        JSON.stringify(data.skills),
        JSON.stringify(data.resume_cv),
        data.availability,
        data.preferred_type_of_volunteering,
        data.emergency_contact_name,
        data.emergency_contact_relationship,
        JSON.stringify(data.emergency_contact_phone),
        data.ngo_position,
        JSON.stringify(data.ngo_location),
      ]
    );

    if (response.error) {
      if (response.error.code === "23505") {
        return res.status(200).json({
          success: false,
          message: "Email already in use",
        });
      }
      return res.status(200).json({
        success: false,
        message: "Could not signup, please try again shortly",
      });
    }

    const id = result.rows[0].id;
    const token = generateToken(id);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".vehsf.com",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 days in milliseconds
    });

    return res.status(200).json({ success: true });
  } catch(error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: "Could not verify payment, please try again",
    });
  }
});

export default complete;
