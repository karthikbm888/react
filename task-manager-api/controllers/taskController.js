const Task = require("../models/Task");
const asyncHandler = require("../middleware/asyncHandler");

// GET all tasks
const getTasks = asyncHandler(async (req, res) => {

  const tasks = await Task.find({ user: req.user.id });

  res.json(tasks);
});

// GET task by ID
const getTaskById = asyncHandler(async (req, res) => {

  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// CREATE task
const createTask = asyncHandler(async (req, res) => {

  const { title } = req.body;

  const task = await Task.create({
    title,
    user: req.user.id   // 🔥 from JWT middleware
  });

  res.status(201).json(task);
});

// UPDATE task
const updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id
    },
    req.body,
    { new: true }
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// DELETE task
const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json({ message: "Task deleted" });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

