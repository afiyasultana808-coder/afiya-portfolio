const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type']
}));
        app.use(express.json());

// DB connection
const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT,
});

// Test route
app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});

// ✅ YOUR API (IMPORTANT)
app.post('/api/messages', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
        await db.execute(sql, [name, email, message]);

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
