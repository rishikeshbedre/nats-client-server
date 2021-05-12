var controllerOperations = require('../controller/controller');

module.exports = function (app) {
    app.get('/client', controllerOperations.showClient);
    app.post('/client', controllerOperations.addClient);
    app.delete('/client', controllerOperations.deleteClient);

    app.post('/logs', controllerOperations.showLogs);
};
