

function initializeWith(io) {

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

}

module.exports = {
    use: initializeWith
};