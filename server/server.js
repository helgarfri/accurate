const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'accurate',
    host: 'localhost',
    database: 'accurate',
    password: 'ragnarlodbrok',
    port: 5432,
});

// API endpoint to get all titles
app.get('/api/titles', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, title FROM series_movies');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// API endpoint to get a specific title by ID
app.get('/api/titles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM series_movies WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            // If no title is found with the given ID, return a 404 error
            return res.status(404).send('Title not found');
        }
        res.json(result.rows[0]); // Return the title data as JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
