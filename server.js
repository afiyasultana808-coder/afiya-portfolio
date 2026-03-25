const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test route
app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});

// ✅ YOUR API (IMPORTANT)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
        await db.query(sql, [name, email, message]);

        res.json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            message: "Database error"
        });
    }
});

// Start server
app.listen(5000, () => {
    console.log('✅ Server running on port 5000');
});