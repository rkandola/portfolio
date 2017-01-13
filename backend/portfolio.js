'use strict';
/* jslint node: true */
/* globals require, __dirname, module */

global.portfolio = {};
(function () {
	var publicFunction = {}, price = require('./price');
	
	publicFunction.addPosition = function (currentPosition) {
		
		if (currentPosition.symbol in global.portfolio ) {
			return false;
		}
		var position =  {};
		position.symbol = currentPosition.symbol;
		position.shares = currentPosition.shares;
		position.price = currentPosition.price;
		console.log()
		global.portfolio[position.symbol] = position;
		return true;
	};
	publicFunction.deletePosition = function (stock) {
		
		if (stock in global.portfolio ) {
			delete global.portfolio[stock];	
			return true;
		}
		return false;
	};
	publicFunction.getPortfolio = function () {
		var getAllPrices = [];
		for ( var symbol in global.portfolio){
			getAllPrices.push(price.getPrice(symbol));
		}
		return Promise.all(getAllPrices);
	};
	publicFunction.formatPortfolio = function (prices) {
		console.log("formatPortfolio"+ JSON.stringify(prices));
		
		var portfolio = [];
		for (var i=0; i< prices.length; i++){
			var price = prices[i];
			var orginalPortfolio = global.portfolio[price.symbol]
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
	module.exports = publicFunction;
}());