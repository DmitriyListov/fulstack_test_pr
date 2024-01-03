const express = require('express');
const { Pool } = require('pg');
const path = require('path');


const app = express();
const port = 3000;

// PostgreSQL configuration
const pool = new Pool({
    user: 'Dmitriy_L',
    host: 'postgres',
    database: 'postgres_test_db',
    password: 'bobmarley',
    port: 5432,
});

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS db_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    last_name VARCHAR(255)
  );
`;

app.post('/insertData', async (req, res) => {
    const { name, last_name } = req.body;
    try {

        await pool.query(createTableQuery);

        const result = await pool.query('INSERT INTO db_table(name, last_name)  VALUES ($1,$2)', [ name, last_name]);

        res.json({ success: true, result: result.rows });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/getData', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM db_table');
        const data = result.rows;
        res.json(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
