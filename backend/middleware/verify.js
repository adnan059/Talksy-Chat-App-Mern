const createError = require("../lib/createError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next(createError(401, "not authenticated"));
    }

    const decoded = jwt.verify(token, process.env.SK);

    if (!decoded) {
      return next(createError(401, "invalid token"));
    }

    const user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return next(createError(404, "user not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
};
