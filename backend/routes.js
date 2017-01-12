'use strict';
/* jslint node: true */
/* globals require , console */

(function() {
    var router = require('express').Router(),
        routeTable;

    module.exports.router = router;
    // This table defines API calls and access type.
    routeTable = {
        '/version': {
            'get': {
                handler: get_version,
                resourceType: "service",
                accessType: "read",
                userAccess: true
            }
        }
    };
    function get_version(req, res)
    {
    	res.json("1.0.1");
    }
    function registerRoutePath(routeEntry) {
        Object.keys(routeTable[routeEntry]).map(function(method) {
            router[method](routeEntry, routeTable[routeEntry][method].handler);
        });
    }

    module.exports.getRouteInfo = function(req) {
        if (routeTable[req.route.path] === undefined) {
            return undefined;
        }
        if (req.route.methods.get) {
            return routeTable[req.route.path].get;
        }
        if (req.route.methods.post) {
            return routeTable[req.route.path].post;
        }
        if (req.route.methods.put) {
            return routeTable[req.route.path].put;
        }
        if (req.route.methods.delete) {
            return routeTable[req.route.path].delete;
        }
    };

    // Initialize all routes.
    Object.keys(routeTable).map(registerRoutePath);

    return;
}());
