require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to database...");
});

db.on("error", (error) => {
  console.error(error);
});

app.use(express.json());

const subscribersRouter = require("./subscribers");
app.use("/subscribers", subscribersRouter);
app.listen(3000, () => console.log("Server running..."));
