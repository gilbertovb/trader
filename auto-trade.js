
// VARs
// REST transport
var BlinkTradeRest = require("blinktrade").BlinkTradeRest;
var BlinkTrade = new BlinkTradeRest({
	prod: true,
	currency: "BRL",
	brokerId: 4,
});
var request = require("request");
var ofertasFB;
var ofertasMB;

function eterna(){
	// Requesting Foxbit
	BlinkTrade.orderbook().then(function(orderbook) {
		ofertasFB = orderbook;
	});

	// Requesting MercadoBitcoin
	request({
	    url: "https://www.mercadobitcoin.net/api/btc/orderbook/",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode == 200) {
	    	ofertasMB = body;
	    }
	});

	try {
		if (ofertasFB.bids[0][0] > ofertasMB.asks[0][0]) {
			if (ofertasFB.bids[0][1] > ofertasMB.asks[0][1]) {
				console.log('Venda no FB e compra no MB de '+ofertasMB.asks[0][1]+' btc.');
				console.log('FB: '+ofertasFB.bids[0][0]);
				console.log('MB: '+ofertasMB.asks[0][0]);				
				console.log('FB qt: '+ofertasFB.bids[0][1]);
				console.log('MB qt: '+ofertasMB.asks[0][1]);
				text = 'Compre '+ofertasMB.asks[0][1]+' btc no MB (R$ '+ofertasMB.asks[0][0]+') e venda no FB (R$ '+ofertasFB.bids[0][0]+').';
			}else{
				console.log('Venda no FB e compra no MB de '+ofertasFB.bids[0][1]+' btc.');
				console.log('FB: '+ofertasFB.bids[0][0]);
				console.log('MB: '+ofertasMB.asks[0][0]);				
				console.log('FB qt: '+ofertasFB.bids[0][1]);
				console.log('MB qt: '+ofertasMB.asks[0][1]);				
				text = 'Compre '+ofertasFB.bids[0][1]+' btc no MB (R$ '+ofertasMB.asks[0][0]+') e venda no FB (R$ '+ofertasFB.bids[0][0]+').';
			}
		}else if (ofertasMB.bids[0][0] > ofertasFB.asks[0][0]) {
			if (ofertasMB.bids[0][1] > ofertasFB.asks[0][1]) {
				console.log('Venda no MB e compra no FB de '+ofertasFB.asks[0][1]+' btc.');
				console.log('FB: '+ofertasFB.asks[0][0]);
				console.log('MB: '+ofertasMB.bids[0][0]);				
				console.log('FB qt: '+ofertasFB.asks[0][1]);
				console.log('MB qt: '+ofertasMB.bids[0][1]);				
				text = 'Compre '+ofertasFB.asks[0][1]+' btc no FB (R$ '+ofertasFB.asks[0][0]+') e venda no MB (R$ '+ofertasMB.bids[0][0]+').';
			}else{
				console.log('Venda no MB e compra no FB de '+ofertasMB.bids[0][1]+' btc.');
				console.log('FB: '+ofertasFB.asks[0][0]);
				console.log('MB: '+ofertasMB.bids[0][0]);				
				console.log('FB qt: '+ofertasFB.asks[0][1]);
				console.log('MB qt: '+ofertasMB.bids[0][1]);				
				text = 'Compre '+ofertasMB.bids[0][1]+' btc no FB (R$ '+ofertasFB.asks[0][0]+') e venda no MB (R$ '+ofertasMB.bids[0][0]+').';
			}
		}
	}catch(err){
		console.log(err.message);
	}
	return text;
}

//setInterval(eterna,5000);
