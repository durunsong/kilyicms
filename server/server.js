const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
});

connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// CRUD Routes

// Create a new user
app.post('/users', (req, res) => {
    const { name, account, password, role, token, create_time, is_delete } = req.body;
    const query = 'INSERT INTO user (name, account, password, role, token, create_time, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, account, password, role, token, create_time, is_delete], (error, results) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(201).send({ id: results.insertId, ...req.body });
    });
});

// Read all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM user WHERE is_delete = 0';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(results);
    });
});

// Read a user by ID
app.get('/users/:id', (req, res) => {
    const query = 'SELECT * FROM user WHERE id = ? AND is_delete = 0';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(404).send();
        }
        res.status(200).send(results[0]);
    });
});

// Update a user by ID
app.patch('/users/:id', (req, res) => {
    const { name, account, password, role, token, create_time, is_delete } = req.body;
    const query = 'UPDATE user SET name = ?, account = ?, password = ?, role = ?, token = ?, create_time = ?, is_delete = ? WHERE id = ?';
    connection.query(query, [name, account, password, role, token, create_time, is_delete, req.params.id], (error, results) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(200).send({ id: req.params.id, ...req.body });
    });
});

// Delete a user by ID (soft delete)
app.delete('/users/:id', (req, res) => {
    const query = 'UPDATE user SET is_delete = 1 WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send({ id: req.params.id });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
