require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./router/index");

const app = express();

// Database connection
require("./models/index");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
