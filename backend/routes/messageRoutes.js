const express = require("express");
const { verifyToken } = require("../middleware/verify");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} = require("../controllers/messageCtrl");

const router = express.Router();

router.get("/users", verifyToken, getUsersForSidebar);

router.get("/:id", verifyToken, getMessages);

router.post("/send/:id", verifyToken, sendMessage);

module.exports = router;
