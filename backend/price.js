'use strict';
/* jslint node: true */
/* globals require, __dirname, module */


(function() {
	var publicFunction = {},yahooFinance = require('yahoo-finance');
	publicFunction.getPrice = function(symbol){
		return new Promise(function(resolve,reject){
			yahooFinance.snapshot({
				  symbol: symbol,
				  fields: ['s', 'n', 'd1', 'l1', 'y', 'r']  
				}, function (err, snapshot) {
				  console.log(snapshot);
				  resolve(snapshot);
				});
		});
		
	};
	module.exports = publicFunction;
}());