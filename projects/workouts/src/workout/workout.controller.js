const service = require("./workout.service");

const getWorkouts = async (req, res) => {
  const filters = req.query;
  console.log("🔎 Getting workouts list. Filters", filters);
  const workouts = await service.getWorkouts(filters);
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const body = req.body;
  console.log("🆕 Creating new workout. ", body);
  const createdWorkout = await service.createWorkout(body);
  res.status(201).json(createdWorkout);
};

const getWorkoutById = async (req, res) => {
  const id = req.params.id;
  console.log("🔎 Getting workout with id ", id);
  const workout = await service.getWorkoutById(id);
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const body = req.body;
  console.log("📝 Updating workout with body ", body);
  const updatedWorkout = await service.updateWorkoutById(body);
  res.status(200).json(updatedWorkout);
};

const deleteWorkoutById = async (req, res) => {
  const id = req.params.id;
  console.log("🗑️ Deleting workout with id ", id);
  const deletedWorkout = await service.deleteWorkoutById(id);
  res.status(200).json(deletedWorkout);
};

module.exports = {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkoutById,
};
