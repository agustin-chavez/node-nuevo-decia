import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import merchantRouter from "./transactions/transactions.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/merchant", merchantRouter);

app.use("/", (req, res) => {
  res.send(
    '<body style="background-color: #047bce; color: white; display: grid; place-items: center"><h1>⛅️ Hola Nuvem! ⛅️</h1></body>',
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`🚀 Server listening on ${process.env.SERVER_URI}`);
  } catch (error) {
    console.error("💩 Something went wrong... ", error.message);
  }
});
