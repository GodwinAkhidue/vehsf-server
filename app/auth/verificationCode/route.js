import express from "express";
import SendNodemailerMail from "../../../config/nodemailer.js";
import sixDigitCodeEmailHtml from "../../../constants/sixDigitCodeEmailHtml.js";
import generateSixDigitCode from "../../../config/generateSixDigitCode.js";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const verificationCode = express();
verificationCode.use(express.json());

verificationCode.post(`/api/auth/verificationCode`, async (req, res) => {
  const { email } = req.body;

  const code = generateSixDigitCode();
  const html = sixDigitCodeEmailHtml(code);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  const query = `
    UPDATE users
    SET verification_code = $1, verification_code_expiry = $2
    WHERE email = $3;
  `;

  const values = [code, expiry, email];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Could not send mail, try again shortly",
      err: JSON.stringify(err),
    });
  }

  const { info, err } = await SendNodemailerMail(
    email,
    "Verification Code",
    html
  );

  if (err) {
    return res.status(200).json({
      success: false,
      message: "Could not send mail, try again shortly",
      err: JSON.stringify(err),
    });
  }

  return res.status(200).json({
    success: true,
  });
});

export default verificationCode;
