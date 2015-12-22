# MusicLounge-DJ
## JSON Message Protocol (GENERAL)

### Error (server → client)
```javascript
var JSON = {
    action: "error",
    data: {
        message: ""
    }
}
```

## JSON Message Protocol (HOST)

### Host a Lounge (client → server)
```javascript
var JSON = {
    action: "hostLounge",
    data: {
        hostName: "",
        userId: "",
        streamURL: "",
        songName: "",
        timestamp: "",
        hostTime: "",
        songImage: "",
        currentLoungeId: "",
        currentLoungeName: ""
    }
}

```

## JSON Message Protocol (JOINER)

### Join a Lounge (client → server)
```javascript
var JSON = {
    action: "joinLounge",
    data: {
        hostName: "",
        userId: ""
    }
}
```
