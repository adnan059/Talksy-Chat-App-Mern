require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookie_parser = require("cookie-parser");
const { app, server } = require("./lib/socket");

// --------------------------------------

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

// --------------------------------------
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

// --------------------------------------

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("database connected successfully");
    server.listen(PORT, () => console.log(`server listening to port ${PORT}`));
  } catch (error) {
    throw new Error(error?.message || "database connection failed");
  }
};

connectDB();

// --------------------------------------

app.use(express.json({ limit: "10mb" }));
app.use(cookie_parser());
app.use(
  cors({
    origin: CLIENT_BASE_URL,

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// --------------------------------------

app.get("/test", (req, res) => {
  res.send("working ok");
});

// --------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// --------------------------------------

app.use((err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "something went wrong";

  const stack = err?.stack;

  return res.status(status).json({
    stack,
    status,
    message,
    success: false,
  });
});
