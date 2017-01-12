'use strict';
/* jslint node: true */
/* globals require, __dirname, module */

(function() {
    var express = require('express'),
    routes = require('./routes'), app = express(), router = express
            .Router();

    router.use('/', routes.router);
    app.use(router);
    module.exports = app;

}());
