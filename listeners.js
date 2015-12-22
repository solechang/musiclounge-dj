function hostLounge(data) {
    console.log(`--> in hostLounge: ${data}`);
}

function joinLounge(data) {
    console.log(`--> in joinLounge: ${data}`);
}

function error(data) {
    console.log(`--> in error: ${data}`);
}

const actions = {
    hostLounge, 
    joinLounge, 
    error
}

module.exports = actions
