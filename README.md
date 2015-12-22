# MusicLounge-DJ

## JSON Message Protocol (HOST)
### Host a Lounge
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

## JSON Message Protocol (CLIENT)
### Join a Lounge
```javascript
var JSON = {
    type: "joinLounge",
    data: {
        hostName: "",
        userId: ""
    }
}
```
