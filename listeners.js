function hostLounge(data) {
    console.log(`--> in hostLounge: ${JSON.stringify(data, null, 2)}`);
}

function joinLounge(data) {
    console.log(`--> in joinLounge: ${JSON.stringify(data, null, 2)}`);
}

function error(data) {
    console.log(`--> in error: ${JSON.stringify(data, null, 2)}`);
}

const actions = {
    hostLounge, 
    joinLounge, 
    error
}

module.exports = actions
