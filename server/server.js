// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var logger = require("morgan");
var cors = require("cors");
const fs = require("fs");

// Get our API routes
const employee = require('./routes/employee');
const visitor = require('./routes/visitor');

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set our api routes
app.use('/employee', employee);
app.use('/visitor', visitor);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const appServer = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
appServer.listen(port, () => console.log(`API running on localhost:${port}`));