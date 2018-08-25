const http = require('http').createServer();
const io = require('socket.io')(http);

const HOST='0.0.0.0';
const PORT=3000;

io.set('origins', '*:*');
io.on('connection', function(client){
    console.log('client connected');
    client.on('event', function(data){});
    client.on('disconnect', function(){});
});



http.listen(PORT,HOST,() => {
    console.log(`Listening on ${HOST}:${PORT}`)
});