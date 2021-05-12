var dataservice = require('./data-service');
var charactergenerate = require('./charactergen');
var { fork } = require('child_process');

const NotAcceptable = 406;
const OK = 200;

function startClient(data, clientname){
    let tempinfo = dataservice.getClientInfo();
    tempinfo[data['clientType']][clientname] = {};

    for(var element in data){
        if(element != 'clientType'){
            tempinfo[data['clientType']][clientname][element] = data[element];
        }
    }

    dataservice.clientLogs[data['clientType']][clientname] = [];

    var forked = fork('./client/'+data['clientType']+'.js', [JSON.stringify(data)]);

    tempinfo[data['clientType']][clientname]['clientInstance'] = forked;
    dataservice.setClientInfo(tempinfo);

    forked.on('message', (msg) => {
        if (dataservice.clientLogs[data['clientType']][clientname].length <= 3500) {
            dataservice.clientLogs[data['clientType']][clientname].push(msg);
        } else {
            dataservice.clientLogs[data['clientType']][clientname] = dataservice.clientLogs[data['clientType']][clientname].slice(3400, dataservice.clientLogs[data['clientType']][clientname].length);
            dataservice.clientLogs[data['clientType']][clientname].push(msg);
        }
    });
}

function stopClient(clientype, clientname){
    let tempinfo = dataservice.getClientInfo();
    let tempprocess = tempinfo[clientype][clientname]['clientInstance'];
    try {
        process.kill(tempprocess.pid);
    } catch (killerror) {
        console.log("Failed killing child process: ", killerror);
    }

    delete tempinfo[clientype][clientname];
    dataservice.setClientInfo(tempinfo);

    delete dataservice.clientLogs[clientype][clientname];
}

function triggerGetClient(resp) {
    resp.status(OK).json(dataservice.getClientInfo());
}

function triggerAddClient(data, resp) {
    let clientname = charactergenerate.makeid();
    startClient(data, clientname);
    resp.status(OK).json({ message: ""+ data['clientType'] +" Client: "+ clientname +" added successfully" });
}

function triggerDeleteClient(data, resp) {
    let tempinfo = dataservice.getClientInfo();
    if(tempinfo[data['clientType']].hasOwnProperty(data['clientName'])){
        stopClient(data['clientType'], data['clientName']);
        resp.status(OK).json({ message: ""+ data['clientType'] +" Client: "+ data['clientName'] +" deleted" });
    } else {
        resp.status(NotAcceptable).json({ error: ""+ data['clientType'] +" Client: "+ data['clientName'] +" not running" });
    }
}

function triggerShowLogs(data, resp) {
    if (dataservice.clientLogs[data['clientType']].hasOwnProperty(data['clientName'])) {
        resp.status(OK).json({ message: dataservice.clientLogs[data['clientType']][data['clientName']] });
    } else {
        resp.status(NotAcceptable).json({ error: ""+ data['clientType'] +" Client: "+ data['clientName'] +" logs not available" });
    }
}

module.exports = {
    triggerGetClient: triggerGetClient,
    triggerAddClient: triggerAddClient,
    triggerDeleteClient: triggerDeleteClient,
    triggerShowLogs: triggerShowLogs
};