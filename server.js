var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(8070);
io.set('log level', 1); // reduce logging

var roles = {};

io.sockets.on('connection', function (socket) {
	socket.on('role', function(data){
		roles[data.role] = socket;
	});

	socket.on('img', function (data) {
		roles.client.emit('img', data);
	});
});
