var express = require('express'); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}); 

io.on('connection', function(socket) { 
    console.log('someone connected!');

    socket.on('note on', function (freq) {
        socket.emit('note on', freq); 
    });

    socket.on('note off', function(freq) {
        socket.emit('note off', freq);
    });

    socket.on('message', function(msg) {
        socket.emit('message', msg); 
    });
});


http.listen(8080, function() { 
    console.log('listening on *:8080');
});
