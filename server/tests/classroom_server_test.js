const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
use(sinonChai);


let SocketMock = require('socket-io-mock');
const classroomServer = require('../src/classroom_server.js');


// Import events module
var events = require('events');

// Create an eventEmitter object
const EventEmitter = events.EventEmitter;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

describe('', function () {

    beforeEach(function () {
        this.socket = new SocketMock();
        classroomServer.attachTo(this.socket);
    });

    function createFakeClient() {
        let API = {
            id: uuidv4(),
            on: () => {console.log('on')},
            emit: () => {console.log('emit')},
        };

        // return API;
        return new EventEmitter();
    }

    it('should ', function () {

        let client1 = createFakeClient();
        let client1On = sinon.spy(client1, "on");
        let client1Emit = sinon.spy(client1, "emit");

        // this.socket.on('message', function (message) {
        //     expect(message).to.equal('Hello World!')
        // });
        this.socket.emitEvent('connection',client1);
        expect(client1On).to.have.been.called;
        //this.socket.socketClient.emit('message', 'Hello World!')
        client1.emit('message','patata');
        expect(client1Emit).to.have.been.called;

    });

});