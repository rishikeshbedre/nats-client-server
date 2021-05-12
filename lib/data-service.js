var clientInfo = {
    Throughput: {},
    Dataloss: {},
    Publisher: {},
    Subscriber: {},
    PublisherLatency: {},
    SubscriberLatency: {},
    PublisherPayload: {},
    SubscriberPayload: {} 
};

var clientLogs = {
    Throughput: {},
    Dataloss: {},
    Publisher: {},
    Subscriber: {},
    PublisherLatency: {},
    SubscriberLatency: {},
    PublisherPayload: {},
    SubscriberPayload: {} 
};

function getClientInfo(){
    return JSON.parse(JSON.stringify(clientInfo));
}

function setClientInfo(data){
    clientInfo = JSON.parse(JSON.stringify(data));
    return clientInfo;
}


module.exports = {
    getClientInfo: getClientInfo,
    setClientInfo: setClientInfo,
    clientLogs: clientLogs
};