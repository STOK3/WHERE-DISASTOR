const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'LOGIN'; // Remove extra quotes
const saltRounds = 10;
const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});

app.post('/register', jsonParser, function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error hashing password' });
        }
        connection.execute(
            'INSERT INTO disater (email, username, password) VALUES (?, ?, ?)', // Correct table name "disaster"
            [req.body.email, req.body.username, hash],
            function (err, results) {
                if (err) {
                    return res.status(500).json({ status: 'error', message: err });
                }
                res.json({ status: 'OK' });
            }
        );
    });
});

app.post('/login', jsonParser, function (req, res) {
    connection.execute(
        'SELECT * FROM disater WHERE username=?', // Correct table name "disaster"
        [req.body.username],
        function (err, users, fields) {
            if (err) {
                return res.status(500).json({ status: 'error', message: err });
            }
            if (users.length === 0) {
                return res.status(401).json({ status: 'error', message: 'User not found' });
            }
            bcrypt.compare(req.body.password, users[0].password, function (err, islogin) {
                if (islogin) {
                    var token = jwt.sign({ email: users[0].username }, secret, { expiresIn: '1h' });
                    res.json({ status: 'OK', msg: 'Login success', token });
                } else {
                    res.json({ status: 'failed', msg: 'Login failed' });
                }
            });
        }
    );
});

app.post('/auth', jsonParser, function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded });
    } catch (err) {
        res.json({ status: 'err', msg: 'Error decoding token' }); // Corrected message
    }
});

app.post('/disaster', jsonParser, function (req, res) {
    // Extract disaster data from the request body
    const disasterData = req.body;

    // Validate required fields (adjust as needed)
    if (!disasterData.date || !disasterData.type || !disasterData.location) {
        return res.status(400).json({ message: 'Missing required fields: date, type, location' });
    }

    // Insert disaster data into the database
    connection.execute(
        'INSERT INTO damage (date, type, location) VALUES (?, ?, ?)',
        [disasterData.date, disasterData.type, disasterData.location],
        function (err, results) {
            if (err) {
                return res.status(500).json({ status: 'error', message: err });
            }
            res.json({ status: 'OK', message: 'Disaster created successfully' });
        }
    );
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});
