import { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/dashboard/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        const data = await response.json();
        if (response.ok) {
            setTasks(data.tasks || []); // ✅ Ensure data.tasks is always an array
          } else {
            console.error("Failed to fetch tasks:", data.message);
          }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
