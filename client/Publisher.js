var NATS = require('nats');

var args = process.argv;
var tempjson = JSON.parse(args[2]);
var host = tempjson['host'];
var username = tempjson['username'];
var password = tempjson['password'];
var port = tempjson['port'];
var topic = tempjson['topic'];
var message = tempjson['message'];
var PublishCount = tempjson['PublishCount'];
var PublishInterval = tempjson['PublishInterval'];

var breakInterval;

function publishData(nc) {
    breakInterval = setInterval(() => {
        for (var i = 1; i <= PublishCount; i++) {
            nc.publish(topic, message);
        }
    }, PublishInterval);
}

function publisherClient() {
    var nc = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);

    nc.on('connect', function () {
        var msg1 = `connected to ${nc.currentServer.url.host}`;
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: msg1});

        nc.flush(function () {
            publishData(nc);
        });
    });

    nc.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err});
    });

    nc.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err.message});
        clearInterval(breakInterval);
    });
}

publisherClient();