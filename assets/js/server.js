const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const portfinder = require('portfinder');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Buat koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gedepanjang123!',
    database: 'portofolio_website',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Endpoint untuk menyimpan data form
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error saving data to MySQL:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        console.log('Data saved to MySQL:', result);
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// Cari port yang tersedia dan jalankan server
portfinder.getPort((err, port) => {
    if (err) {
        console.error('Error finding port:', err);
        return;
    }

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});