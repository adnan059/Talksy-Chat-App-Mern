const express = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/authCtrl");
const { verifyToken } = require("../middleware/verify");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", verifyToken, updateProfile);

router.get("/check", verifyToken, checkAuth);

module.exports = router;
