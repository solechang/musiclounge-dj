var server = require('http').createServer();
var WebsocketServer = require('ws').Server;
var socketServer = new WebsocketServer({ server : server });
var express = require('express');
var app = express();
var listeners = require('./listeners.js');

global.Lounges = {};

// Simply send a message to the connected client
app.use((req, res) => {
    res.send('hi');
});

// Declare the action handlers
const actions = {
    'hostLounge'    : listeners.hostLounge,
    'joinLounge'    : listeners.joinLounge,
    'error'         : listeners.error 
};

// Instantiate listeners upon a socketServer connection 
socketServer.on('connection', ws => {
    console.log('Client connected to server!');

    // Listener to handle incoming client messages
    ws.on('message', message => {
        var json = JSON.parse(message);
        actions[json.action](ws, json.data);
    });

    // Listener to handle a client disconnection
    ws.on('close', () => {
        console.log('Client disconnected from the server!');
    });
});

server.on('request', app);
server.listen(1337, () => {
    console.log('🌏  Server listening on port 1337');
});

