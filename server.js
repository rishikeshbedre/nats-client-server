var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var cors = require('cors');
app.use(cors());

const port = process.env.PORT || '6062';
app.set('port', port);

var server = app.listen(port, function(){
    console.log("server listening at localhost "+port);
    require('./apis/routes/routes')(app);
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
