var NATS = require('nats');

var args = process.argv;
var tempjson = JSON.parse(args[2]);
var host = tempjson['host'];
var username = tempjson['username'];
var password = tempjson['password'];
var port = tempjson['port'];
var topic = tempjson['topic'];
var SubscribeInterval = tempjson['SubscribeInterval'];

var subcount;
var breakInterval;

function subscribeCountInterval(){
    breakInterval = setInterval(() => {
        var timeTemp = new Date().toISOString();
        var msg1 = 'Subscription message received: '+ subcount;
        process.send({timeStamp: timeTemp, message: msg1});
        subcount = 0;
    }, SubscribeInterval);
}

function subscriberClient() {
    var nc = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);

    subscribeCountInterval();

    nc.on('connect', function () {
        subcount = 0;

        nc.subscribe(topic, function (message) {
            subcount += 1;
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

subscriberClient();