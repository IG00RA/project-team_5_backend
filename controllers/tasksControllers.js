const { ctrlWrapper, HttpError } = require("../helpers");
const { Task } = require("../models/Task");

const getAllTasks = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const tasks = await Task.find({ owner });
  res.status(200).json(tasks);
});

const createTask = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const newTask = await Task.create({ ...req.body, owner });
  res.status(201).json(newTask);
});

const updateTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  res.status(200).json(updatedTask);
});

const removeTask = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const removedTask = await Task.findByIdAndRemove(id);
  if (!removedTask) {
    throw new HttpError(404, "Task not found");
  }
  res.status(200).json(removedTask);
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
};
