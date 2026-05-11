// const express = require("express");

// const {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask
// } = require("../controllers/taskController");

// const router = express.Router();

// router.get("/", getTasks);
// router.post("/", createTask);
// router.put("/:id", updateTask);
// router.delete("/:id", deleteTask);

// module.exports = router;

// const { body } = require("express-validator");
// const validate = require("../middleware/validate");

// router.post(
//   "/",
//   [
//     body("title").notEmpty().withMessage("Title is required")
//   ],
//   validate,
//   createTask
// );

const express = require("express");
const { body } = require("express-validator");

const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

// GET all tasks
router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTaskById);

router.post(
  "/",
  authMiddleware,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters")
  ],
  validate,
  createTask
);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);
module.exports = router;
console.log(require("../controllers/taskController"));