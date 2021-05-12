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

var subcount;
var breakInterval;

function send(nc2) {
    breakInterval = setInterval(() => {
        var timeTemp = new Date().toISOString();
        var lossvalue = 100 - (subcount / PublishCount * 100);
        var msg1 = "subscription messages received: " + subcount;
        var msg2 = "% of loss: " + lossvalue + "%";
        process.send({ timeStamp: timeTemp, message: msg1 });
        process.send({ timeStamp: timeTemp, message: msg2 });
        subcount = 0;
        for (var i = 0; i < PublishCount; i++) {
            nc2.publish(topic+'.'+i, message);
        }
    }, PublishInterval);
}

function datalossClient() {

    var nc1 = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);
    var nc2 = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);


    nc1.on('connect', function () {

        subcount = 0;

        nc1.subscribe(topic+'.>', function () {
            subcount += 1;
        });

        // Make sure sub is registered
        nc1.flush(function () {
            send(nc2);
        });
    });

    nc1.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err});
    });

    nc2.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err});
    });

    nc1.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err.message});
    });
    nc2.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err.message});
        clearInterval(breakInterval);
    });
}

datalossClient();