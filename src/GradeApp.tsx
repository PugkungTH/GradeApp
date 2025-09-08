import React, { useState } from "react";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const GRADES = ["A", "B+", "B", "C+", "C", "D", "F", "W"];

// กำหนดคะแนนตามเกรด (ตัวอย่าง: W = not counted in GPA => null)
const gradePoints: Record<string, number | null> = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  D: 1.0,
  F: 0.0,
  W: null,
};

export default function GradeApp() {
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>(GRADES[0]);
  const [list, setList] = useState<Subject[]>([]);

  const addSubject = () => {
    if (subject.trim() === "") return;
    const newSub: Subject = { id: Date.now(), name: subject.trim(), grade };
    setList((s) => [newSub, ...s]);
    setSubject("");
    setGrade(GRADES[0]);
  };

  const deleteSubject = (id: number) => {
    setList((s) => s.filter((x) => x.id !== id));
  };

  const calculateGPA = (): { gpa: number; counted: number } => {
    // นำเฉพาะวิชาที่มีค่า points (ไม่รวม W)
    const pts = list
      .map((s) => gradePoints[s.grade])
      .filter((p): p is number => typeof p === "number"); // filter ให้เป็น number จริง ๆ
    const counted = pts.length;
    if (counted === 0) return { gpa: 0, counted: 0 };
    const sum = pts.reduce((a, b) => a + b, 0);
    const gpa = sum / counted;
    return { gpa, counted };
  };

  const { gpa, counted } = calculateGPA();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>ระบบบันทึกรายวิชา & คำนวณ GPA</h2>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="กรอกชื่อวิชา"
          style={{ padding: "8px", width: 180 }}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ padding: "8px" }}>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={addSubject} style={{ padding: "8px 12px" }}>
          เพิ่มรายวิชา
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
        {list.map((s) => (
          <li key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", borderBottom: "1px solid #f0f0f0" }}>
            <div>
              <strong>{s.name}</strong>
              <span style={{ marginLeft: 10, color: s.grade === "F" ? "red" : "#333" }}>({s.grade})</span>
            </div>
            <div>
              <button onClick={() => deleteSubject(s.id)} style={{ color: "red", background: "transparent", border: "none", cursor: "pointer" }}>
                ลบ
              </button>
            </div>
          </li>
        ))}
        {list.length === 0 && <li style={{ color: "#666" }}>ยังไม่มีรายวิชา</li>}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => {
            // ไม่มี action — คำนวณแบบ realtime แล้วแสดงด้านล่าง
            alert(counted === 0 ? "ไม่มีวิชาที่นำมาคำนวณ (W ถูกละเว้น)" : `GPA = ${gpa.toFixed(2)} (จาก ${counted} วิชา)`);
          }}
          style={{ padding: "8px 12px" }}
        >
          คำนวณ GPA (แสดงเป็น alert)
        </button>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>ผลลัพธ์:</strong>{" "}
        {counted === 0 ? "ยังไม่มีวิชาที่นับใน GPA (W ถูกละเว้น)" : `GPA = ${gpa.toFixed(2)} (จาก ${counted} วิชา)`}
      </div>
    </div>
  );
}
