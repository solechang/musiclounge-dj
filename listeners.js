// Websocket action handlers
//
// Add the user and song information in the Lounge JSON object
function hostLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in hostLounge');

    // Add the host and their corresponding websocket to the list of lounges
    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;
    global.Lounges[data.userId].clientIds = [];

    // Store the user id with the websocket object
    ws.userId = data.userId;

    console.dir(global.Lounges);
}

// Remove the host's name from the Lounge JSON object
function unhostLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in unhostLounge');

    // Construct the message to kick the joiners connected to the lounge
    var message = {
        action: "kickJoiner",
        data: { }
    };

    // Gather all ids joined in a music lounge
    var joinerIds = [];
    for(var id in global.Lounges[data.userId].clientIds)
        joinerIds.push(id);
        
    // Broadcast the message to all joiners and remove the host from the list of lounges
    broadcast(data.userId, joinerIds, message);
    delete global.Lounges[data.userId];

    console.dir(global.Lounges);
}

// Add the joiner name to the list of clients in their desired host's current 
// lounge and request for the lounge information
function joinLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in joinLounge');

    // Store the joiner's user id with the websocket object
    ws.userId = data.userId;

    // Check if the host id exists in the list of lounges
    if(global.Lounges[data.hostId]) {
        global.Lounges[data.hostId].clientIds[data.userId] = data;
        global.Lounges[data.hostId].clientIds[data.userId].socket = ws;
    } else {
        console.log("Unable to join lounge! Chosen user is not a host");
        ws.send(JSON.stringify({
            action: "error",
            data: {
                errantAction: "joinLounge",
                hostName: data.hostName,
                message: "Unable to join lounge! Chosen user is not a host"
            }
        }));
        return;
    }

    console.dir(global.Lounges);

    // Construct a message to request the host information 
    requestHostInfo(ws, data);
}

// Request information from the host necessary to play the lounge's current song
function requestHostInfo(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in requestHostInfo`);
    
    // Construct a message to request the host information 
    var message = {
        action: "requestHostInfo",
        data: {
            joinerId: data.userId
        }
    }

    // Send to the host socket
    global.Lounges[data.hostId].socket.send(JSON.stringify(message));
}

// The host will send the lounge and current song information to the joiner
function sendHostInfo(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in sendHostInfo');
    console.dir(global.Lounges[data.userId].clientIds);

    var json = {
        action: "processHostInfo",
        data: data
    }
    processHostInfo(ws, json);
}

// Process the host lounge information to be able to start the song in sync on the joiner's end
function processHostInfo(ws, json) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in processHostInfo`);

    if(global.Lounges[json.data.userId]) {
        global.Lounges[json.data.userId].clientIds[json.data.joinerId].socket.send(JSON.stringify(json));
    } else {
        console.log(`Unable to process host information! Invalid host ID: ${json.data.userId}`);
        ws.send(JSON.stringify({
            action: "error",
            data: {
                errantAction: "processHostInfo",
                message: "Unable to process host information! Invalid host ID: "+json.data.userId
            }
        }));
        return;
    }
}

// Remove the joiner name from the list of clients in the joined host's current lounge
function leaveLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in leaveLounge');

    if(global.Lounges[data.hostId])
        delete global.Lounges[data.hostId].clientIds[data.userId];
    
    console.dir(global.Lounges);
}

// Broadcast to all listeners that when the DJ plays or pauses a song
function changeSong(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in changeSong');

    // Construct a message to broadcast to all client to update their songs
    var message = {
        action: "updateClients",
        data: data
    }
    
    // Gather all ids joined in a music lounge
    var clientIds = [];
    for(var id in global.Lounges[data.userId].clientIds)
        clientIds.push(id);
     
    // Broadcast to all clients 
    broadcast(data.hostId, clientIds, message);
}

function joinerReady(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in joinerReady');

    // Construct a message to send to the DJ to request the updated song time
    var message = {
        action: "requestSongTime",
        data: data
    }

    global.Lounges[data.hostId].socket.send(JSON.stringify(message));
}

function sendHostSongTime(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('--> in sendHostSongTime');

    // Construct a message to send to the DJ to request the updated song time
    var message = {
        action: "joinerStartSong",
        data: data
    }

    if(global.Lounges[data.hostId]) {
        global.Lounges[data.hostId].clientIds[data.joinerId].socket.send(JSON.stringify(message));
    } else {
        console.log(`Unable to process host information! Invalid host ID: ${data.hostId}`);
        ws.send(JSON.stringify({
            action: "error",
            data: {
                errantAction: "processHostInfo",
                message: "Unable to process host information! Invalid host ID: "+data.hostId
            }
        }));
        return;
    }
}

// Auxiliary functions
//
// Broadcast to sockets keyed by user ids
function broadcast(hostId, ids, data) {
    ids.forEach(id => global.Lounges[hostId].clientIds[id].socket.send(JSON.stringify(data)));
}

// Constant object for export
const actions = {
    hostLounge, 
    unhostLounge,
    joinLounge, 
    requestHostInfo,
    sendHostInfo,
    processHostInfo,
    leaveLounge,
    changeSong,
    joinerReady,
    sendHostSongTime 
}

module.exports = actions
