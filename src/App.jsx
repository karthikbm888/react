import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      // remove locally instead of full refetch (faster UX)
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle complete
  const toggleTask = async (task) => {
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      });

      // update locally (no full reload)
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      {/* Input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "5px", marginRight: "10px" }}
      />

      <button onClick={addTask}>Add</button>

      {/* Task list */}
      <ul style={{ marginTop: "20px" }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            
            {/* Toggle complete */}
            <span
              onClick={() => toggleTask(task)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {task.title}
            </span>

            {/* Delete */}
            <button onClick={() => deleteTask(task.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;