var NATS = require('nats');

var args = process.argv;
var tempjson = JSON.parse(args[2]);
var host = tempjson['host'];
var username = tempjson['username'];
var password = tempjson['password'];
var port = tempjson['port'];
var topic = tempjson['topic'];
var payload = tempjson['payload'];  //it should be in kilobytes
var PublishCount = tempjson['PublishCount'];
var PublishInterval = tempjson['PublishInterval'];

var breakInterval;
var messageString = '{1:dummy,2:dummy,3:dummy,4:dummy,5:dummy,6:dummy,7:dummy,8:dummy,9:dummy,10:dummy,11:dummy,12:dummy}';
var generatedString = '';

function createMessage() {
    var iterationNumber = Math.round((payload * 1024) / messageString.length);
    for (var i = 1; i <= iterationNumber; i++) {
        generatedString += messageString;
    }
}

function publishData(nc) {
    breakInterval = setInterval(() => {
        for (var i = 1; i <= PublishCount; i++) {
            var timeTemp = new Date();
            var msgTemp = JSON.stringify({timeStamp: timeTemp, message: generatedString});
            nc.publish(topic+'.'+i, msgTemp);
        }
    }, PublishInterval);
}

function publisherClient() {
    var nc = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);

    createMessage();

    nc.on('connect', function () {
        var msg1 = `connected to ${nc.currentServer.url.host}`;
        var timeTemp = new Date().toISOString();
        process.send({ timeStamp: timeTemp, message: msg1 });

        nc.flush(function () {
            publishData(nc);
        });
    });

    nc.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({ timeStamp: timeTemp, message: err });
    });

    nc.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({ timeStamp: timeTemp, message: err.message });
        clearInterval(breakInterval);
    });
}

publisherClient();
