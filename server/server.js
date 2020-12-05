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

// serve up production assets
app.use(express.static('client/build'));

// serve up the index.html if express does'nt recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
});


const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const connections = new Set()

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function (request) {
  connections.add(request.accept(null, request.origin));
});

exports.Server = function () {
  return { wsServer, connections };
}

wsServer.on('message', function (message) {
  connections.forEach((conn) => conn.send(message))
})

// Once the client disconnects, the `close` handler is called
wsServer.on('close', () => {
  connections.delete(wsServer)
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