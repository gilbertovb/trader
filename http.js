var http = require('http');
var comparacao = require('./compara');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(comparacao.precos());
	res.write(Date());
	res.end('<h1>Hello World!!!</h1>');
}).listen(3000);



