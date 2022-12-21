
function startConnect() {
    
    clientID = "clientID-" + parseInt(Math.random() * 100);

    
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;

    
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    
    client.connect({ 
        onSuccess: onConnect,
    });
}


function onConnect() {
    
    topic = document.getElementById("topic").value;

    
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    
    client.subscribe(topic);
}


function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}


function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
}


function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}
