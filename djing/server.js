var server = require('http').createServer();
var WebsocketServer = require('ws').Server;
var ws = new WebsocketServer({ server : server });
var express = require('express');
var app = express();

// Simply send a message to the connected client
app.use((req, res) => {
    res.send('hi');
});

// Instantiate listeners upon a websocket connection 
ws.on('connection', ws => {
    console.log('Server is connected');

    ws.on('open', () => {
        console.log('Websocket connected');
        ws.send('hi :>');
    });

    ws.on('message', data => {
        console.log('Received message from the client: '+data);
    });
});

server.on('request', app);
server.listen(1337, () => {
    console.log('🌏  Server listening on port 1337');
});
