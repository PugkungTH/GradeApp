import React, { useState } from "react";

type Task = {
  id: number;
  text: string;
};

export default function TodoApp() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask: Task = { id: Date.now(), text: task.trim() };
    setTasks((prev) => [newTask, ...prev]);
    setTask("");
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>To-do List</h2>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
          placeholder="พิมพ์งานที่ต้องทำ..."
          style={{ padding: "8px", width: 220 }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 10px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <span>{t.text}</span>
            <button
              onClick={() => deleteTask(t.id)}
              style={{ marginLeft: 12, color: "red", background: "transparent", border: "none", cursor: "pointer" }}
            >
              ลบ
            </button>
          </li>
        ))}
        {tasks.length === 0 && <li style={{ color: "#666" }}>ยังไม่มีรายการ</li>}
      </ul>
    </div>
  );
}
