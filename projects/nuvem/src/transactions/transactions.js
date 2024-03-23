import express from "express";
import controller from "./controller/transactions.controller.js";

const router = express.Router();

router.post("/", controller.createTransaction);

export default router;
