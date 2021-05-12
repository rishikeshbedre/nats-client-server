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

var received;
var start;

function send(nc2) {
    received = 0;
    start = new Date();
    for (let i = 0; i < PublishCount; i++) {
        nc2.publish(topic+'.'+i, message);
    }
}

function throughputClient() {

    var nc1 = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);
    var nc2 = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);

    nc1.on('connect', function () {

        received = 0;
        start = new Date();

        nc1.subscribe(topic+'.>', function () {
            received += 1;

            if (received == PublishCount) {
                var stop = new Date();
                var mps = parseInt(PublishCount / ((stop - start) / 1000), 10);
                var datamps = ((message.length * mps) / (1024 * 1024)).toFixed(2);
                var timeTemp = new Date().toISOString();
                var msg1 = 'Published/Subscribe at ' + mps + ' msgs/sec';
                var msg2 = 'Data transfered: ' + datamps + ' megabyte/sec';
                process.send({ timeStamp: timeTemp, message: msg1 });
                process.send({ timeStamp: timeTemp, message: msg2 });
                send(nc2);
            }
        });

        // Make sure sub is registered
        nc1.flush(function () {
            send(nc2);
        });
    });

    nc1.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({ timeStamp: timeTemp, message: err });
    });

    nc2.on('error', (err) => {
        var timeTemp = new Date().toISOString();
        process.send({ timeStamp: timeTemp, message: err });
    });

    nc1.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err.message});
    });
    nc2.on('permission_error', function (err) {
        var timeTemp = new Date().toISOString();
        process.send({timeStamp: timeTemp, message: err.message});
    });
}

throughputClient();