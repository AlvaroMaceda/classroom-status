const http = require('http').createServer();
const io = require('socket.io')(http);

const HOST='0.0.0.0';
const PORT=3000;

io.set('origins', '*:*');
io.on('connection', function(client){
    console.log('client connected');
    //console.log(client.conn);
    // console.log(client);
    // console.log('-----------------------------------------');
    // console.log('-----------------------------------------');
    // console.log('-----------------------------------------');
    console.log(client.id);
    //console.log(client.request);
    client.on('event', function(data){});
    client.on('disconnect', function(){});
});



http.listen(PORT,HOST,() => {
    console.log(`Listening on ${HOST}:${PORT}`)
});