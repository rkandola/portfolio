'use strict';
/* jslint node: true */
/* globals require, __dirname, module */

(function () {
	var publicFunction = {}
		,mysql = require('mysql')
		,dbconfig = require('../config/database')
		,connection_config = {}
		,price = require('./price');
	
	connection_config.database = dbconfig.database;
	connection_config.host = dbconfig.connection.host;
	connection_config.user = dbconfig.connection.user;
	connection_config.password = dbconfig.connection.password;
	
	publicFunction.addPosition = function (user_id,currentPosition) {
		return new Promise(function(resolve,reject){		
			var queryString = "INSERT INTO position set ? ";
			var data = {};
			data.user_id =user_id;
			data.symbol =currentPosition.symbol;
			data.shares =currentPosition.shares;
			data.price =currentPosition.price;
			var connection = mysql.createConnection(connection_config);
			connection.connect();
			connection.query(queryString,data, function(err, rows, fields) {
				if (err) reject(err);
			    resolve("OK");
			});
			connection.end();
		});
	};
	publicFunction.deletePosition = function (user_id,symbol) {
		
		return new Promise(function(resolve,reject){		
			var queryString = "DELETE FROM position where user_id= "
				+user_id+ " AND "
				+"symbol = '"+symbol+"'";
			var connection = mysql.createConnection(connection_config);
			connection.connect();
			connection.query(queryString, function(err, rows, fields) {
				if (err) reject(err);
			    resolve("OK");
			});
			connection.end();
		});
	};
	publicFunction.getPrices = function (positions) {
		var getAllPrices = [];
		console.log("In getPrice"+JSON.stringify(positions));
		for ( var symbol in positions){
			getAllPrices.push(price.getPrice(symbol));
		}
		return Promise.all(getAllPrices);
	};
	publicFunction.formatPortfolio = function (positons,prices) {
		console.log("formatPortfolio"+ JSON.stringify(prices));
		console.log("formatPortfolio"+ JSON.stringify(positons));
		
		var portfolio = [];
		for (var i=0; i< prices.length; i++){
			var price = prices[i];
			var orginalPortfolio = positons[price.symbol]
			var updatePortfolio = {};
			updatePortfolio.symbol = orginalPortfolio.symbol;
			updatePortfolio.shares = orginalPortfolio.shares;
			updatePortfolio.price = orginalPortfolio.price;
			updatePortfolio.name = price.name;
			updatePortfolio.lastDate = price.lastTradeDate;
			updatePortfolio.lastPrice = price.lastTradePriceOnly;
			updatePortfolio.pl = (updatePortfolio.lastPrice - updatePortfolio.price)*updatePortfolio.shares;
			updatePortfolio.ret = (updatePortfolio.lastPrice - updatePortfolio.price)/updatePortfolio.price;
			portfolio.push(updatePortfolio);
		}
		console.log("Done formatPortfolio");
		return portfolio;
	};
	publicFunction.getPosition = function (user_id,p)
	{
		return new Promise(function(resolve,reject){
			
			var queryString = 'SELECT * FROM position where user_id='+user_id;
			var connection = mysql.createConnection(connection_config);
			connection.connect();
			connection.query(queryString, function(err, rows, fields) {
				if (err) reject(err);
			    for (var i in rows) {
			    	var position =  {};
					position.symbol = rows[i].symbol;
					position.shares = rows[i].shares;
					position.price = rows[i].price;
					p[position.symbol] = position;
			    }
			    resolve(p);
			});
			connection.end();
		});
	}
	module.exports = publicFunction;
}());