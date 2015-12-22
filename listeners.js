// Websocket action handlers
//
// Add the user and song information in the Lounge JSON object
function hostLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in hostLounge: ${JSON.stringify(data, null, 2)}`);

    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;
    global.Lounges[data.userId].clientIds = [];
    ws.userId = data.userId;
}

// Remove the host's name from the Lounge JSON object
function unhostLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in unhostLounge: ${JSON.stringify(data, null, 2)}`);

    var message = {
        action: "kickJoiner",
        data: { }
    };
    broadcast(global.Lounges[data.userId].clientIds, message);
    delete global.Lounges[data.userId];
}

// Add the joiner name to the list of clients in their desired host's current 
// lounge and request for the lounge information
function joinLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in joinLounge: ${JSON.stringify(data, null, 2)}`);

    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;
    ws.userId = data.userId;

    global.Lounges[data.hostId].clientIds.push(data.userId);
    requestHostInfo(ws, data);
}

// Request information from the host necessary to play the lounge's current song
function requestHostInfo(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in requestHostInfo`);
    
    var message = {
        action: "requestHostInfo",
        data: {
            joinerId: data.userId
        }
    }
    global.Lounges[data.hostId].socket.send(JSON.stringify(message));
}

// The host will send the lounge and current song information to the joiner
function sendHostInfo(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in sendHostInfo: ${JSON.stringify(data, null, 2)}`);

    var json = {
        action: "sendHostInfo",
        data: data
    }
    processHostInfo(ws, json);
}

// Process the host lounge information to be able to start the song in sync on the joiner's end
function processHostInfo(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in processHostInfo`);
    global.Lounges[data.joinerId].socket.send(JSON.stringify(data));
}

// Remove the joiner name from the list of clients in the joined host's current lounge
function leaveLounge(ws, data) {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    console.log(`--> in leaveLounge: ${JSON.stringify(data, null, 2)}`);
}

// Auxiliary functions
function broadcast(ids, data) {
    ids.forEach(id => global.Lounges[id].socket.send(data));
}

function success() {
    
}

function error() {

}

// Constant object for export
const actions = {
    hostLounge, 
    unhostLounge,
    joinLounge, 
    requestHostInfo,
    sendHostInfo,
    processHostInfo,
    leaveLounge
}

module.exports = actions
