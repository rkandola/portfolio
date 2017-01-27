'use strict';
/* jshint node: true */
/* globals require */
(function() {
    var express = require('express'),
    bodyParser = require('body-parser'),
    apiApp = require('./api'),
    app = express(),
    router = express.Router();
    app.use(bodyParser.json({
        type : [ 'json', '+json' ]
    }));
    
    app.use('/api', router);
    router.use('/portfolio', apiApp);
    module.exports = app;

}());
