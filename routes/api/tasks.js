const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
} = require("../../controllers/tasksControllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updateSchema } = require("../../models/Task");

router.get("/", authenticate, getAllTasks);

router.post("/", authenticate, validateBody(addSchema), createTask);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateSchema),
  updateTask
);

router.delete("/:id", authenticate, isValidId, removeTask);

module.exports = {
  tasksRouter: router,
};
