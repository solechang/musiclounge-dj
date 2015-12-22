// Websocket action handlers
function hostLounge(ws, data) {
    console.log(`--> in hostLounge: ${JSON.stringify(data, null, 2)}`);
    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;
    ws.userId = data.userId;
}

function unhostLounge(ws, data) {
    console.log(`--> in unhostLounge: ${JSON.stringify(data, null, 2)}`);
    var message = {
        action: "kickJoiner",
        data: { }
    };
    broadcast(global.Lounges[data.userId].clientIds, message);
    delete global.Lounges[data.userId];
}

function updateJoiner(ws, data) {
    console.log(`--> in updateJoiner: ${JSON.stringify(data, null, 2)}`);
}

function sendHostInfo(ws, data) {
    console.log(`--> in sendHostInfo: ${JSON.stringify(data, null, 2)}`);
    var message = {
        action: "requestHostInfo",
        data: { }
    }
    ws.send(message);
}

// Add the joiner name to the list of clients in their desired host's current 
// lounge and request for the lounge information
function joinLounge(ws, data) {
    console.log(`--> in joinLounge: ${JSON.stringify(data, null, 2)}`);
    if(!global.Lounges[data.hostId].clientIds)
        global.Lounges[data.hostId].clientIds = [];
    global.Lounges[data.hostId].clientIds.push(data.userId);
}

function leaveLounge(ws, data) {
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
    updateJoiner,
    joinLounge, 
    leaveLounge,
}

module.exports = actions
