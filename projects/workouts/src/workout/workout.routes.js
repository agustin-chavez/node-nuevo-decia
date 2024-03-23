const express = require("express");
const router = express.Router();
const workoutController = require("./workout.controller");

router.get("/", workoutController.getWorkouts);

router.post("/", workoutController.createWorkout);

router.get("/:id", workoutController.getWorkoutById);

router.patch("/", workoutController.updateWorkout);

router.delete("/:id", workoutController.deleteWorkoutById);

module.exports = router;
