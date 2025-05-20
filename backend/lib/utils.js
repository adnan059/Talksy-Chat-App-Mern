const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SK, { expiresIn: "7d" });
  return token;
};

const tokenCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production",
};

const Email_Pattern = process.env.EMAIL_PATTERN;

const Password_Pattern = process.env.PASSWORD_PATTERN;

module.exports = {
  generateToken,
  tokenCookieOptions,
  Email_Pattern,
  Password_Pattern,
};
