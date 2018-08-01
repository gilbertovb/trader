/*
MB
- R$ 2,90 + 2% (Saque)
- R$ 2,90 + 2% (Deposito)
- 0,70% (Trade)
FB
- 1,39% (Saque)
- 0,50% (Trade)

*/
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
var text = '';

// Database config
var { Pool } = require('pg');
var db = new Pool({
  user: 'trade_user',
  host: 'localhost',
  database: 'trade_db',
  password: '123456',
  port: 5432,
});

function getPrices(callback){
	// Requesting Foxbit
	BlinkTrade.orderbook().then(function(orderbook) {
		ofertasFB = orderbook;

		// Requesting MercadoBitcoin
		request({
		    url: "https://www.mercadobitcoin.net/api/btc/orderbook/",
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode == 200) {
		    	ofertasMB = body;
				callback();
		    }
		});
	});

}

//exports.precos = function (){
function eterna (){
	getPrices(function(){
		// Variaveis de data
		var momento = new Date();
		var ano = momento.getFullYear();
		var mes = momento.getMonth() + 1;
		var dia = momento.getDate();
		var hora = momento.getHours();
		var minuto = momento.getMinutes();
		var segundo = momento.getSeconds();

		// Variaveis de compra e venda com taxa
		var FB_compra = ofertasFB.bids[0][0]+(ofertasFB.bids[0][0]*0.005);
		var FB_venda = ofertasFB.asks[0][0]-(ofertasFB.asks[0][0]*0.005);
		var MB_compra = ofertasMB.bids[0][0]+(ofertasMB.bids[0][0]*0.007);
		var MB_venda = ofertasMB.asks[0][0]-(ofertasMB.asks[0][0]*0.007);

		// Compra no MercadoBitcoin e vende no FoxBit
		if(FB_venda > MB_compra){
			dif = FB_venda - MB_compra;
			// Menor volume no FoxBit
			if (ofertasFB.bids[0][1] > ofertasMB.asks[0][1]) {

				var text = "INSERT INTO trades(compra,compra_valor,venda,venda_valor,quantidade,momento) VALUES('MercadoBitcoin',$1,'FoxBit',$2,$3,$4)";
				var values = [MB_venda,FB_compra,ofertasMB.asks[0][1],ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo];
				db.query(text, values);
				text = 'Compre '+ofertasMB.asks[0][1]+' btc no MB (R$ '+MB_compra+') e venda no FB (R$ '+FB_venda+') - '+ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
			}else{
			// Menor volume no MercadoBitcoin
				var text = "INSERT INTO trades(compra,compra_valor,venda,venda_valor,quantidade,momento) VALUES('MercadoBitcoin',$1,'FoxBit',$2,$3,$4)";
				var values = [MB_venda,FB_compra,ofertasFB.bids[0][1],ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo];
				db.query(text, values);
				text = 'Compre '+ofertasFB.bids[0][1]+' btc no MB (R$ '+MB_compra+') e venda no FB (R$ '+FB_venda+') - '+ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
			}
		// Compra no FoxBit e venda no MercadoBitcoin
		}else if(MB_venda > FB_compra) {
			dif = MB_venda - FB_compra;
			// Menor volume no FoxBit
			if (ofertasMB.bids[0][1] > ofertasFB.asks[0][1]) {

				var text = "INSERT INTO trades(compra,compra_valor,venda,venda_valor,quantidade,momento) VALUES('FoxBit',$1,'MercadoBitcoin',$2,$3,$4)";
				var values = [FB_compra,MB_venda,ofertasFB.asks[0][1],ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo];
				db.query(text, values);
				text = 'Compre '+ofertasFB.asks[0][1]+' btc no FB (R$ '+FB_compra+') e venda no MB (R$ '+MB_venda+') - '+ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
			// Menor volume no MercadoBitcoin
			}else{

				var text = "INSERT INTO trades(compra,compra_valor,venda,venda_valor,quantidade,momento) VALUES('FoxBit',$1,'MercadoBitcoin',$2,$3,$4)";
				var values = [FB_compra,MB_venda,ofertasMB.bids[0][1],ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo];
				db.query(text, values);
				text = 'Compre '+ofertasMB.bids[0][1]+' btc no FB (R$ '+FB_compra+') e venda no MB (R$ '+MB_venda+') - '+ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
			}
		// Sem negocio
		}else{
			var text = "INSERT INTO trades(compra,compra_valor,venda,venda_valor,quantidade,momento) VALUES('-',0,'-',0,0,$1)";
			var values = [ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo];
			db.query(text, values);
			text = 'Sem negocio - '+ano+'-'+mes+'-'+dia+' '+hora+':'+minuto+':'+segundo;
		}
//		console.log(text);
	});
}

//setInterval(eterna,3600000);
setInterval(eterna,60000);

