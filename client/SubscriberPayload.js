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
var totalbytes = 0;
var LatencyArray = [];

function calcPayloadlength(data, subtime){
    var jsonmsg = JSON.parse(data);
    LatencyArray.push(subtime - new Date(jsonmsg.timeStamp));
    totalbytes += jsonmsg.message.length;
}

function subscribeCountInterval(){
    breakInterval = setInterval(() => {
        var timeTemp = new Date().toISOString();
        var datamps = ((totalbytes) / (1024 * 1024)).toFixed(2);
        var templatency = (eval(LatencyArray.join('+'))/LatencyArray.length).toFixed(2);
        var msg1 = 'Subscription message received: '+ subcount;
        var msg2 = 'Data received: ' + datamps + ' megabyte/sec';
        var msg3 = 'Average Latency: '+ templatency + 'ms';
        process.send({timeStamp: timeTemp, message: msg1});
        process.send({timeStamp: timeTemp, message: msg2});
        process.send({timeStamp: timeTemp, message: msg3});
        subcount = 0;
        totalbytes = 0;
        LatencyArray = [];
    }, SubscribeInterval);
}

function subscriberClient() {
    var nc = NATS.connect("nats://" + username + ":" + password + "@" + host + ":" + port);

    subscribeCountInterval();

    nc.on('connect', function () {
        subcount = 0;

        nc.subscribe(topic+'.>', function (message) {
            subcount += 1;
            var subTime = new Date();
            calcPayloadlength(message, subTime);
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
