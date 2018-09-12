

function attachTo(io) {

    //io.removeAllListeners();

    //https://socket.io/docs/server-api/#Socket
    io.on('connection', function(socket){
        console.log('SERVER. socket connected');
        //console.log(socket.conn);
        // console.log(socket);
        // console.log('-----------------------------------------');
        // console.log('-----------------------------------------');
        // console.log('-----------------------------------------');
        console.log('SERVER. ' +socket.id);
        //console.log(socket.request);
        socket.on('event', function(data){});

        socket.on('disconnect', function(data){
            console.log(`disconnect: ${data}`)
        });

        socket.on('message', function(data){
            console.log(`SERVER. message: ${data}`);
            console.log('SERVER. Emmiting something');
            socket.emit('message','chorizo');
        });

    });

}

module.exports = {
    attachTo: attachTo
};