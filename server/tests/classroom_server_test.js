const { expect } = require('chai');

let SocketMock = require('socket-io-mock');
const classroomServer = require('../src/classroom_server.js');



describe('', function () {

    beforeEach(function () {
        this.socket = new SocketMock();
        classroomServer.attachTo(this.socket);
    });

    it('should ', function () {

        this.socket.on('message', function (message) {
            expect(message).to.equal('Hello World!')
        });
        this.socket.emitEvent('connection',{});
        this.socket.socketClient.emit('message', 'Hello World!')
    });

});