const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./workout/workout.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/workouts", workoutRouter);

app.listen(3000, async () => {
  await mongoose.connect("mongodb://localhost:27017/workouts-db");
  console.log(`🚀 Server listening http://localhost:${PORT}/`);
});
