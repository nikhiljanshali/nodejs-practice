const BASE = "http://localhost:3001";
// http://localhost:3001/get-students

// export const getAllStudents = () =>
//   console.log(`${BASE}/get-students`);
//   fetch(`${BASE}/get-students`).then((r) => r.json());

export const getAllStudents = async () => {
  const res = await fetch(`${BASE}/get-students`);
  return res.json(); // ✅ return data directly
};

export const getStudentById = (id) =>
  fetch(`${BASE}/get-student/${id}`).then((r) => r.json());

export const getStudentsByAge = (age) =>
  fetch(`${BASE}/get-students/${age}`).then((r) => r.json());

export const searchStudents = (value) =>
  fetch(`${BASE}/find-students/${value}`).then((r) => r.json());

export const addStudent = (data) =>
  fetch(`${BASE}/add-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateStudent = (id, data) =>
  fetch(`${BASE}/update-student/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteStudent = (id) =>
  fetch(`${BASE}/delete-student/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());
