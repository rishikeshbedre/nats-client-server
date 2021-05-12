var triggerOperations = require('../../lib/trigger-service');

function showClient(req, resp){
    triggerOperations.triggerGetClient(resp);
}

function addClient(req, resp){
    triggerOperations.triggerAddClient(req.body, resp);
}

function deleteClient(req, resp){
    triggerOperations.triggerDeleteClient(req.body, resp);
}

function showLogs(req, resp){
    triggerOperations.triggerShowLogs(req.body, resp);
}

module.exports = {
    showClient: showClient,
    addClient: addClient,
    deleteClient: deleteClient,
    showLogs: showLogs
};