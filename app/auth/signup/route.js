import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";
import generateToken from "../../../config/jwt.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const signup = express();
signup.use(express.json());

signup.post(`/api/auth/signup`, async (req, res) => {
  const { data, profile_picture, resume_cv } = req.body;
  console.log("called");
  const userid = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);
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
        hashedPassword,
        data.role,
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
      ]
    );

    const { error, result } = response;

    if (error) {
      if (error.code === "23505") {
        return res.status(200).json({
          success: false,
          message: "Email already in use",
        });
      }
      console.log(error);
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
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Could not signup, please try again shortly",
    });
  }
});

export default signup;
