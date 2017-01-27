
    var express  = require('express');
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

    var app = require('./api/app');
    app.set('port', process.env.PORT || 4000);
    app.use('/', express.static(__dirname + '/public'));
    app.listen(4000);
    console.log("App listening on port 4000");

