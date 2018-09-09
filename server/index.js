const http = require('http').createServer();
const io = require('socket.io')(http);
const classroomServer = require('./src/classroom_server.js');

const HOST='0.0.0.0';
const PORT=3000;

io.set('origins', '*:*');
classroomServer.attachTo(io);

http.listen(PORT,HOST,() => {
    console.log(`Listening on ${HOST}:${PORT}`)
});