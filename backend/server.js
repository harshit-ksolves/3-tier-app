const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 8081;

// Add these lines to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: `${process.env.ALLOWED_SOURCES_TO_BACKEND}`, // allow all now, can use "http://localhost:3000"
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: false
})); 

// Database Connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to database");
});

// Get All Students
app.get('/', (req, res) => {
  const query = "SELECT * FROM students";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Add New Student
app.post('/add', (req, res) => {
  console.log('Request body:',req.body);
  
  const { name, class: studentClass, roll_number } = req.body;
  
  const query = "INSERT INTO students (name, class, roll_number) VALUES (?, ?, ?)";
  
  db.query(query, [name, studentClass, roll_number], (err, result) => {
    if (err) {
      console.error("Error adding student:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json({ 
      message: "Student added successfully", 
      id: result.insertId 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});