function broadcast(ids, data) {
    ids.forEach(id => global.Lounges[id].socket.send(data));
}

function hostLounge(ws, data) {
    console.log(`--> in hostLounge: ${JSON.stringify(data, null, 2)}`);
    global.Lounges[data.userId] = data;
    global.Lounges[data.userId].socket = ws;

    broadcast([data.userId], 'whoa');
}

function joinLounge(ws, data) {
    console.log(`--> in joinLounge: ${JSON.stringify(data, null, 2)}`);
}

function error(ws, data) {
    console.log(`--> in error: ${JSON.stringify(data, null, 2)}`);
}

const actions = {
    hostLounge, 
    joinLounge, 
    error
}

module.exports = actions
