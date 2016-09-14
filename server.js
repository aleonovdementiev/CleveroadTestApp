var express = require('express'),
    http = require('http'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    config = require('./config/'),
    log = require('./libs/log')(module),
    app = express();

app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function () {
    log.info('Express runs on port: ' + app.get('port'));
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/web-app/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
    if (app.get('env') == 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});


module.exports = app;
