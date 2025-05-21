const createError = require("../lib/createError");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateToken, tokenCookieOptions } = require("../lib/utils");
const cloudinary = require("../lib/cloudinary");

// sign up
const signup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullName) {
      return next(createError(400, "all the fields must be filled out"));
    }
    const hashedPswd = await bcryptjs.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPswd,
    });

    const { _id, password, ...others } = newUser._doc;

    const token = generateToken(_id);

    res
      .status(201)
      .cookie("jwt", token, tokenCookieOptions)
      .json({ _id, ...others });
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(createError(400, "all the fields must be filled out"));
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(400, "wrong credentials"));
    }

    const isValidPswd = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!isValidPswd) {
      return next(createError(400, "wrong credentials"));
    }

    const { _id, password, ...others } = user._doc;

    const token = generateToken(_id);

    res
      .status(200)
      .cookie("jwt", token, tokenCookieOptions)
      .json({ _id, ...others });
  } catch (error) {
    next(error);
  }
};

// logout
// const logout = async (req, res, next) => {
//   try {
//     res
//       .status(200)
//       .cookie("jwt", "", { maxAge: 0 })
//       .json({ message: "logged out successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

const logout = async (req, res, next) => {
  console.log("Environment ==>", process.env.NODE_ENV);
  try {
    res
      .status(200)
      .clearCookie("jwt", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return next(createError(400, "profile picture is required"));
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const checkAuth = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
