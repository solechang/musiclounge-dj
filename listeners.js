// Websocket action handlers
function hostLounge(ws, data) {
    console.log(`--> in hostLounge: ${JSON.stringify(data, null, 2)}`);
    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;
    ws.userId = data.userId;
}

function unhostLounge(ws, data) {
    console.log(`--> in unhostLounge: ${JSON.stringify(data, null, 2)}`);
}

function updateJoiner(ws, data) {
    console.log(`--> in updateJoiner: ${JSON.stringify(data, null, 2)}`);
}

function joinLounge(ws, data) {
    console.log(`--> in joinLounge: ${JSON.stringify(data, null, 2)}`);
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
