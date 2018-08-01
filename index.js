
// REST transport
var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({
	prod: true,
	currency: "BRL",
	brokerId: 4,
//	key: "6BvDy7Huhp7zt98PrwyZQIC2pUoRVw8B5VpoubYWaeA",
//	secret: "OLEVJanurdqzXF6704Rs0tggHxaFyTk1E9yr9GgfyGM",
});
/*
// REST Transport
var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var blinktrade = new BlinkTradeRest({
	prod: true,
	key: "LIjWT7WtRyd9SL8ZHs3ENzD3HvOkLwilARVcayQRnUo",
	secret: "urjkCBcEHh1ZBoJFdD4xXlxVvoUU0GRLjBAMPuZX37o",
	currency: "BRL",
});

// WebSocket Transport
var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
var blinktrade = new BlinkTradeWS({ prod: true, brokerId: 4 });
blinktrade.connect().then(function() {
	return blinktrade.login({ "username": "LIjWT7WtRyd9SL8ZHs3ENzD3HvOkLwilARVcayQRnUo", "password": "nmhoIzuUyO2NZx0" });
}).then(function(logged) {
	console.log(logged);
}).catch(function(err) {
	console.log(err);
});


blinktrade.balance().then(function(balance) {
  console.log(balance);
});

*/
// Current status exchange
//BlinkTrade.ticker().then(function(ticker) {
//	console.log(ticker);
//});
// Book list
BlinkTrade.orderbook().then(function(orderbook) {
	// Compra
	console.log('FoxBit');
	console.log('Quantidade - Valor de Compra <-> Valor de Venda - Quantidade');
	console.log(orderbook.bids[0][1]+' - '+orderbook.bids[0][0]+' <-> '+orderbook.asks[0][0]+' - '+orderbook.asks[0][1]);
	// Venda
//	console.log(orderbook.asks[0]);
});

var request = require("request");
request({
    url: "https://www.mercadobitcoin.net/api/btc/orderbook/",
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode == 200) {
		console.log('MercadoBitcoin');
		console.log('Quantidade - Valor de Compra <-> Valor de Venda - Quantidade');
		console.log(body.bids[0][1]+' - '+body.bids[0][0]+' <-> '+body.asks[0][0]+' - '+body.asks[0][1]);
    }
});

// generate a hash from string
var crypto = require('crypto'),
    text = '/tapi/v3/?tapi_method=get_account_info&tapi_nonce=2',
    key = '94c7d46f2bc27a779872c86e8ad9f2a5fe510bfaaf52e040d977e412fec890cf'

// create hahs
var hash = crypto.createHmac('sha512', key)
hash.update(text)
var value = hash.digest('hex')

var options = {
	url: 'https://www.mercadobitcoin.net/tapi/v3/',
	method: 'POST',
	headers: {
		'Content-Type':'application/x-www-form-urlencoded',
		'TAPI-ID': '258c271055a285b7bdc99c8f6920585a',
		'TAPI-MAC': value
	},
	form: { 'tapi_method':'get_account_info', 'tapi_nonce':2 }
};
request(options, function(error, response, body){
	if (!error && response.statusCode == 200){
		console.log('INFO');
		console.log(body);
	}else{
		console.log('ERROR');
		console.log(error);
	}
});
// Last trades
//BlinkTrade.trades({ limit: 2 }).then(function(trades) {
//	console.log(trades);
//});
/*
// Trade history
BlinkTrade.tradeHistory().then(function(trades) {
	console.log(trades);
});

// Balance
BlinkTrade.balance({ "MsgType": "U2", "BalanceReqID": 1 }).then(function(balance) {
	console.log(balance);
});

// My orders
blinktrade.myOrders({
	"MsgType": "U4",
	"OrdersReqID": 930019,
	"Page": 0,
	"PageSize": 1 }).then(function(myOrders) {
	console.log(myOrders);
});

// Send order
blinktrade.sendOrder({
	"MsgType": "D",
	"ClOrdID": 8426208,
	"Symbol": "BTCUSD",
	"Side": "1",
	"OrdType": "2",
	"Price": parseInt((550 * 1e8).toFixed(0)),
	"OrderQty": parseInt((0.05 * 1e8).toFixed(0)),
	"BrokerID": 4
}).then(function(order) {
	console.log(order);
});

// Cancel order
blinktrade.cancelOrder({
	"MsgType": "F",
	"OrderID": 1459028830899,
	"ClOrdID": 8426208
}).then(function(order) {
	console.log("Order Cancelled");
});

// Deposit list
blinktrade.requestDepositList({
	"MsgType": "U30",
	"DepositListReqID": 123,
	"Page": 0,
	"PageSize": 1,
	"StatusList": ["1", "2", "4", "8"]
}).then(function(deposits) {
	console.log(deposits);
});

// Withdraw list
blinktrade.requestWithdrawList({
	"MsgType": "U26",
	"WithdrawListReqID": 1,
	"Page": 0,
	"PageSize": 1,
	"StatusList": ["1", "2"]
}).then(function(withdraws) {
	console.log(withdraws);
});
*/


