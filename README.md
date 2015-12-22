# MusicLounge-DJ

## Server-side Logic
##### Storing Lounges
A JSON object keyed by the unique user id will represent the data necessary to host and join lounges
```javascript
var Lounges = {
    1gr8s142 : {
        hostName : "Alice",
        streamURL : "www.etc.com/song",
        songName : "Whatever",
        songImage : "www.etc.com/img",
        clientIds : ["13f1143", "12f123", "f311123"],
        currentLoungeName : "loungename"
    },
    14tgt4rngu : {
        ...
    }
}
```

## JSON Message Protocol (GENERAL)

##### Success (server → client)
An action was successfully processed by the server
```javascript
var JSON = {
    action: "success",
    data: {
        properAction: "hostLounge"
    }
}
```

##### Error (server → client)
An error occurred in processing an action by the server
```javascript
var JSON = {
    action: "error",
    data: {
        errantAction: "hostLounge",
        message: "User not a host (not registered in lounge)"
    }
}
```

## JSON Message Protocol (HOST)

##### Host a Lounge (client → server)
Add the user and song information in the Lounge JSON object
```javascript
var JSON = {
    action: "hostLounge",
    data: {
        hostName: "",
        userId: "",
        streamURL: "",
        songName: "",
        songTime: "",
        hostTime: "",
        songImage: "",
        currentLoungeId: "",
        currentLoungeName: ""
    }
}

```

##### Unhost a Lounge (client → server)
Remove the host's name from the Lounge JSON object
```javascript
var JSON = {
    action: "unhostLounge",
    data: {
        userId: ""
    }
}
```

##### Kick Joiner (server → client)
Remove the list of joiners in a lounge (as a result of host leaving their lounge)
```javascript
var JSON = {
    action: "kickJoiner",
    data: { }
}
```

##### Send Host Info (client → server)
The host will send the lounge and current song information to the joiner
```javascript
var JSON = {
    action: "sendHostInfo",
    data: { 
        hostName: "",
        userId: "",
        streamURL: "",
        songName: "",
        songTime: "",
        hostTime: "",
        songImage: "",
        currentLoungeId: "",
        currentLoungeName: ""
    }
}
```

##### Request Host Info (server → client)
Request information from the host necessary to play the lounge's current song
```javascript
var JSON = {
    action: "requestHostInfo",
    data: { }
}
```

## JSON Message Protocol (JOINER)

##### Join a Lounge (client → server)
Add the joiner name to the list of clients in their desired host's current lounge and request for the lounge information
```javascript
var JSON = {
    action: "joinLounge",
    data: {
        hostName: "",
        hostId: "",
        userId: ""
    }
}
```

##### Leave a Lounge (client → server)
Remove the joiner name from the list of clients in the joined host's current lounge
```javascript
var JSON = {
    action: "leaveLounge",
    data: {
        hostName: "",
        userId: ""
    }
}
```

##### Process Host Info (server → client)
Process the host lounge information to be able to start the song in sync on the joiner's end
```javascript
var JSON = {
    action: "processHostInfo",
    data: {
        hostName: "",
        userId: "",
        streamURL: "",
        songName: "",
        songTime: "",
        hostTime: "",
        songImage: "",
        currentLoungeId: "",
        currentLoungeName: ""
    }
}
```
