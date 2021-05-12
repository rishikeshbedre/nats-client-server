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
var LatencyArray = [];

function pushDataToLatencyArray(submsg, subtime){
    var jsonsubmsg = JSON.parse(submsg);
    LatencyArray.push(subtime - new Date(jsonsubmsg.timeStamp));
}

function subscribeCountInterval(){
    breakInterval = setInterval(() => {
        var timeTemp = new Date().toISOString();
        var msg1 = 'Subscription message received: '+ subcount;
        var templatency = (eval(LatencyArray.join('+'))/LatencyArray.length).toFixed(2);
        var msg2 = 'Average Latency: '+ templatency + 'ms';
        process.send({timeStamp: timeTemp, message: msg1});
        process.send({timeStamp: timeTemp, message: msg2});
        subcount = 0;
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
            pushDataToLatencyArray(message, subTime);
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