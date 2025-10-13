import express from "express";

const logout = express();
logout.use(express.json());

logout.get(`/api/admin/auth/logout`, (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".vehsf.com",
    path: "/",
  });

  return res.status(200).json({ success: true });
});

export default logout;
