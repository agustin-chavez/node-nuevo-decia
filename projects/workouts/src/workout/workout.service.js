const Workout = require("./workout.model");

const getWorkouts = async (filters) => {
  const workouts = await Workout.find(filters);
  console.log("✅ Workouts retrieved successfully! ", workouts);
  return workouts;
};

const createWorkout = async (workout) => {
  const createdWorkout = await Workout.create(workout);
  console.log("✅ Workout created successfully! ", createdWorkout);
  return createdWorkout;
};

const getWorkoutById = async (id) => {
  const workout = await Workout.findById(id);
  console.log("✅ Workout found! ", workout);
  return workout;
};

const updateWorkoutById = async (modifiedWorkout) => {
  const updatedWorkout = await Workout.findOneAndUpdate({
    updatedAt: Date.now(),
    ...modifiedWorkout,
  });
  console.log("✅ Workout updated! ", updatedWorkout);
  return updatedWorkout;
};

const deleteWorkoutById = async (id) => {
  const deletedWorkout = await Workout.findByIdAndDelete(id);
  console.log("🗑️ Workout deleted! ", deletedWorkout);
  return deletedWorkout;
};

module.exports = {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkoutById,
  deleteWorkoutById,
};
