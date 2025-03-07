import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    roll_number: ''
  });

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${process.env.FRONTEND_TO_BACKEND_GET}`) // Use localhost for development
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post(`${process.env.FRONTEND_TO_BACKEND_GET}`, newStudent, { // Use localhost for development
      headers: {
        'Content-Type': 'application/json' // Ensure the Content-Type header is set
      }
    })
      .then(response => {
        // Refresh the student list
        fetchStudents();
        // Clear the form
        setNewStudent({
          name: '',
          class: '',
          roll_number: ''
        });
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <div>
      <h2>Student List</h2>
      {/* Student Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.roll_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Form */}
      <h3>Add New Student</h3>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={newStudent.class}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="roll_number"
          placeholder="Roll Number"
          value={newStudent.roll_number}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default StudentList;