'use strict';
/* jslint node: true */
/* globals require , console */

(function() {
    var router = require('express').Router(),
    	portfolio = require('./portfolio'),
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
        },
    	'/stock': {
	        'post': {
	            handler: add_position,
	            resourceType: "service",
	            accessType: "read",
	            userAccess: true
	        }
    	},
        '/stock/:symbol': {
            'delete': {
                handler: delete_position,
                resourceType: "service",
                accessType: "read",
                userAccess: true
            }
        },
        '/': {
            'get': {
                handler: get_position,
                resourceType: "service",
                accessType: "read",
                userAccess: true
            }
        }
    };
    function get_version(req, res)
    {
    	res.json("1.0.0");
    }
    function add_position(req, res)
    {
    	if ( portfolio.addPosition(req.body) ) {
    		res.status(201).json("Position Added");
    	} 
    	else {
    		res.status(400).json("Bad Request");
    	}
    	
    }
    function delete_position(req, res)
    {
    	if ( portfolio.deletePosition(req.params.symbol) ) {
    		res.status(201).json("Position Deleted");
    	}
    	else {
    		res.status(400).json("Bad Request");
    	}
    	
    }
    function get_position(req, res)
    {
    	portfolio.getPortfolio()
    	.then(function(allPrices){	
    		console.log("in all then");
    		res.json(portfolio.formatPortfolio(allPrices));
    	});
    	
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
