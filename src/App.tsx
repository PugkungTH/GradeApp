import React from "react";
import TodoApp from "./Todolist";
import GradeApp from "./GradeApp";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>React Practice — To-do & Grade/GPA</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <TodoApp />
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <GradeApp />
        </div>
      </div>
    </div>
  );
}
