

function attachTo(io) {

    //io.removeAllListeners();

    //https://socket.io/docs/server-api/#Socket
    io.on('connection', function(socket){
        console.log('socket connected');
        //console.log(socket.conn);
        // console.log(socket);
        // console.log('-----------------------------------------');
        // console.log('-----------------------------------------');
        // console.log('-----------------------------------------');
        console.log(socket.id);
        //console.log(socket.request);
        socket.on('event', function(data){});

        socket.on('disconnect', function(data){
            console.log(`disconnect: ${data}`)
        });

        socket.on('message', function(data){
            console.log(`message: ${data}`);
            socket.emit('patata');
        });

    });

}

module.exports = {
    attachTo: attachTo
};