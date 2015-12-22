# MusicLounge-DJ
---
## JSON Message Protocol (GENERAL)

### Error (server ➢ client)
```javascript
var JSON = {
    type: "error",
    data: {
        message: ""
    }
}
```

## JSON Message Protocol (HOST)

### Host a Lounge (client ➢ server)
```javascript
var JSON = {
    type: "hostLounge",
    data: {
        hostName: "",
        userId: "",
        streamURL: "",
        songName: "",
        timestamp: "",
        currentLoungeId: "",
        currentLoungeName: ""
    }
}

```

## JSON Message Protocol (JOINER)

### Join a Lounge (client ➢ server)
```javascript
var JSON = {
    type: "joinLounge",
    data: {
        hostName: "",
        userId: ""
    }
}
```
