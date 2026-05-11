// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connection (FIX THIS LINE)
// mongoose.connect("mongodb+srv://kone843173_db_user:kone843173_mongo_db@cluster0.p6v0gm2.mongodb.net/?appName=Cluster0")
// // mongodb+srv://kone843173_db_user:bEZv4839ZlZudrCy@cluster0.ab12cd3.mongodb.net/taskdb?retryWrites=true&w=majority  
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error:", err));

// // Schema + Model
// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const Task = mongoose.model("Task", taskSchema);

// // test route
// app.get("/", (req, res) => {
//   res.send("Task Manager API is running");
// });

// // GET all tasks
// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // CREATE task
// app.post("/tasks", async (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }

//     const newTask = new Task({ title });
//     await newTask.save();

//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE task
// app.put("/tasks/:id", async (req, res) => {
//   try {
//     const updated = await Task.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE task
// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const deleted = await Task.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//###########################################################################################################

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connection (FIXED)
// mongoose.connect(process.env.MONGO_URI = "mongodb+srv://kone843173_db_user:kone843173_mongo_db@cluster0.p6v0gm2.mongodb.net/?appName=Cluster0")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB error:", err));

// // Schema + Model
// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const Task = mongoose.model("Task", taskSchema);

// // test route
// app.get("/", (req, res) => {
//   res.send("Task Manager API is running");
// });

// // GET all tasks
// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // CREATE task
// app.post("/tasks", async (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }

//     const newTask = new Task({ title });
//     await newTask.save();

//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE task
// app.put("/tasks/:id", async (req, res) => {
//   try {
//     const updated = await Task.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE task
// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const deleted = await Task.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// 11111111111111111111111111111111111
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = 3000;
const authRoutes = require("./routes/authRoutes");

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// Task Routes
app.use("/tasks", taskRoutes);

// Error Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.use(errorHandler);
app.use("/auth", authRoutes);