import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"; // Assuming we add custom CSS here

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    registration_number: "",
    student_class: "",
  });
  const [editStudent, setEditStudent] = useState(null);

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/students/");
      setStudents(response.data);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change for new student
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Create a new student
  const createStudent = async () => {
    try {
      if (
        newStudent.first_name &&
        newStudent.last_name &&
        newStudent.phone_number &&
        newStudent.address &&
        newStudent.registration_number &&
        newStudent.student_class
      ) {
        await axios.post("http://localhost:8000/students/", newStudent);
        toast.success("Student added successfully!");
        fetchStudents();
        setNewStudent({
          first_name: "",
          last_name: "",
          phone_number: "",
          address: "",
          registration_number: "",
          student_class: "",
        });
      } else {
        toast.error("All fields are required");
      }
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/students/${id}`);
      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  // Handle input change for editing a student
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value });
  };

  // Update a student
  const updateStudent = async () => {
    try {
      if (
        editStudent &&
        editStudent.first_name &&
        editStudent.last_name &&
        editStudent.phone_number &&
        editStudent.address &&
        editStudent.registration_number &&
        editStudent.student_class
      ) {
        await axios.put(
          `http://localhost:8000/students/${editStudent.id}`,
          editStudent
        );
        toast.success("Student updated successfully!");
        setEditStudent(null);
        fetchStudents();
      } else {
        toast.error("All fields are required");
      }
    } catch (error) {
      toast.error("Failed to update student");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Student CRUD App</h1>

      {/* Success/Error Messages */}
      <ToastContainer />

      {/* New Student Form */}
      <div className="form-container">
        <h2>Create New Student</h2>
        <div className="form-group">
          <input
            name="first_name"
            value={newStudent.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="input-field"
          />
          <input
            name="last_name"
            value={newStudent.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="input-field"
          />
          <input
            name="phone_number"
            value={newStudent.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input-field"
          />
          <input
            name="address"
            value={newStudent.address}
            onChange={handleChange}
            placeholder="Address"
            className="input-field"
          />
          <input
            name="registration_number"
            value={newStudent.registration_number}
            onChange={handleChange}
            placeholder="Registration Number"
            className="input-field"
          />
          <input
            name="student_class"
            value={newStudent.student_class}
            onChange={handleChange}
            placeholder="Class"
            className="input-field"
          />
          <button onClick={createStudent} className="btn submit-btn">
            Add Student
          </button>
        </div>
      </div>

      {/* Students List */}
      <h2 className="table-title">Students List</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Registration Number</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              {editStudent?.id === student.id ? (
                <>
                  <td>
                    <input
                      name="first_name"
                      value={editStudent.first_name}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="last_name"
                      value={editStudent.last_name}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="phone_number"
                      value={editStudent.phone_number}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="address"
                      value={editStudent.address}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="registration_number"
                      value={editStudent.registration_number}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td>
                    <input
                      name="student_class"
                      value={editStudent.student_class}
                      onChange={handleEditChange}
                      className="input-field edit-input"
                    />
                  </td>
                  <td style={{display:'flex', flexDirection:'row'}}>
                    <button className="btn update-btn" onClick={updateStudent}>
                      Update
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => setEditStudent(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.address}</td>
                  <td>{student.registration_number}</td>
                  <td>{student.student_class}</td>
                  <td style={{display:'flex', flexDirection:'row'}}>
                    <button
                      className="btn edit-btn"
                      onClick={() => setEditStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
