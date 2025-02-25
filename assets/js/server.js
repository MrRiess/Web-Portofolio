const express = require('express');
const { Pool } = require('pg'); // Menggunakan library pg untuk PostgreSQL
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi CORS
const corsOptions = {
    origin: ['https://mrriess.github.io', 'https://mrriess.github.io/Web-Portofolio'], // Izinkan permintaan dari GitHub Pages
    methods: 'GET,POST', // Izinkan metode GET dan POST
    optionsSuccessStatus: 200 // Status untuk preflight request
};
app.use(cors(corsOptions));

// Buat koneksi ke database Supabase (PostgreSQL)
const pool = new Pool({
    user: 'postgres.jsiycglsxksfewzkpmkt', // Username dari Supabase
    host: 'aws-0-ap-southeast-1.pooler.supabase.com', // Host dari Supabase
    database: 'postgres', // Database name
    password: 'Gedepanjang123!', // Password dari Supabase
    port: 5432, // Port dari Supabase
    ssl: {
        rejectUnauthorized: false // Supabase menggunakan SSL
    }
});

// Endpoint untuk menyimpan data form
app.post('/submit-form', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Simpan data ke database Supabase
        const result = await pool.query(
            'INSERT INTO contacts (name, email, subject, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [name, email, subject, message]
        );
        console.log('Data saved to Supabase:', result.rows[0]);
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data to Supabase:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});