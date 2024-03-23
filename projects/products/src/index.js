import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./module/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/products", productRouter);

app.listen(process.env.PORT, () => mongoose.connect(process.env.MONGO_URL));

console.log("Running...");
