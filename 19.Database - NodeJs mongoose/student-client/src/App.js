import { useEffect, useState } from "react";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
  getStudentsByAge,
} from "./api";
import "./App.css";

const emptyForm = { firstname: "", lastname: "", age: "", email: "" };

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [message, setMessage] = useState("");

  // Load all students on mount
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const data = await getAllStudents(); // already JSON
      // console.log(data);
      setStudents(data.students || []);
    } catch (err) {
      console.error("Error loading students:", err);
    }
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Handle form input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Update
  const handleSubmit = async () => {
  if (!form.firstname || !form.lastname || !form.age || !form.email) {
      return notify("⚠️ All fields are required!");
    }
    if (editId) {
      const res = await updateStudent(editId, form);
      notify(res.message);
      setEditId(null);
    } else {
      const res = await addStudent(form);
      notify(res.message);
    }
    setForm(emptyForm);
    loadAll();
  };

  // Populate form for editing
  const handleEdit = (student) => {
    setForm({ firstname: student.firstname, lastname: student.lastname, age: student.age, email: student.email });
    setEditId(student._id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    const res = await deleteStudent(id);
    notify(res.message);
    loadAll();
  };

  // Search by name/email
  const handleSearch = async () => {
    if (!search.trim()) return loadAll();
    const res = await searchStudents(search);
    setStudents(res.students || []);
    notify(res.message);
  };

  // Filter by age
  const handleAgeFilter = async () => {
    if (!ageFilter.trim()) return loadAll();
    const res = await getStudentsByAge(ageFilter);
    setStudents(res.students || []);
    notify(res.message);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🎓 NodeJs API Test Management System</h1>

      {/* Notification */}
      {message && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          {message}
        </div>
      )}

      {/* Form */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "1rem",
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <h3>{editId ? "✏️ Edit Student" : "➕ Add"}</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            type="number"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            type="email"
            onChange={handleChange}
            style={inputStyle}
          />
          <button onClick={handleSubmit} style={btnStyle("#007bff")}>
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setForm(emptyForm);
              }}
              style={btnStyle("#6c757d")}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSearch} style={btnStyle("#17a2b8")}>
          Search
        </button>

        <input
          placeholder="Filter by age..."
          value={ageFilter}
          type="number"
          onChange={(e) => setAgeFilter(e.target.value)}
          style={{ ...inputStyle, maxWidth: 160 }}
        />
        <button onClick={handleAgeFilter} style={btnStyle("#fd7e14")}>
          Filter Age
        </button>

        <button
          onClick={() => {
            setSearch("");
            setAgeFilter("");
            loadAll();
          }}
          style={btnStyle("#6c757d")}
        >
          Reset
        </button>
      </div>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Header */}
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr style={{ background: "#343a40", color: "#fff" }}>
              <th style={th}>#</th>
              <th style={th}>First Name</th>
              <th style={th}>Last Name</th>
              <th style={th}>Age</th>
              <th style={th}>Email</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s, i) => (
                <tr
                  key={s._id}
                  style={{ background: i % 2 === 0 ? "#fff" : "#f2f2f2" }}
                >
                  <td style={td}>{i + 1}</td>
                  <td style={td}>{s.firstname}</td>
                  <td style={td}>{s.lastname}</td>
                  <td style={td}>{s.age}</td>
                  <td style={td}>{s.email}</td>
                  <td style={td}>
                    <button
                      onClick={() => handleEdit(s)}
                      style={btnStyle("#28a745", true)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      style={btnStyle("#dc3545", true)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p
        style={{
          marginTop: 12,
          color: "#888",
          background: "#f1f1f1",
          padding: "12px",
          borderRadius: 6,
        }}
      >
        Total: {students.length} student(s)
      </p>
    </div>
  );
}

// Styles
const inputStyle = {
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
  flex: 1,
  minWidth: 160,
};
const th = { padding: "10px 14px", textAlign: "left" };
const td = { padding: "10px 14px", borderBottom: "1px solid #ddd" };
const btnStyle = (bg, small = false) => ({
  background: bg,
  color: "#fff",
  border: "none",
  padding: small ? "6px 12px" : "9px 18px",
  borderRadius: 6,
  cursor: "pointer",
  marginRight: 4,
  fontSize: small ? 13 : 14,
});

export default App;
