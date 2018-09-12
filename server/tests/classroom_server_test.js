const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const eventToPromise = require('event-to-promise');
use(sinonChai);


const classroomServer = require('../src/classroom_server.js');

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



const ioClient = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');




describe('GETTING MAD', function () {

    let httpServer;
    let httpServerAddr;
    let httpConnectionAddress;
    let ioServer;

    let clients = [];

    /**
     * Setup WS & HTTP servers
     */
    before((done) => {
        // Create an http server
        httpServer = http.createServer().listen();

        // Store address for connection later
        httpServerAddr = httpServer.address();
        httpConnectionAddress = `http://[${httpServerAddr.address}]:${httpServerAddr.port}`;

        // Attach server to http server
        ioServer = ioBack(httpServer);
        done();
    });

    /**
     *  Cleanup WS & HTTP servers
     */
    after((done) => {
        ioServer.close();
        httpServer.close();
        done();
    });

    function connectClient() {
        let socket = ioClient.connect(httpConnectionAddress, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['websocket'],
        });
        // socket.on('connect', () => {
        //     console.log('banana');
        // });

        // let socket = io('http://localhost:3000');

        clients.push(socket);
        return socket;
    }

    beforeEach(() => {
        console.log('beforeEach');
        clients = [];
        classroomServer.attachTo(ioServer);
    });

    afterEach(() => {
        console.log('afterEach');
        clients.forEach((client) => {
            client.disconnect();
        });
        ioServer.removeAllListeners();
    });


    it('should ', function (done) {


        console.log('1');
        let c1 = connectClient();


        let foo = eventToPromise(c1,"message");
        foo.then((data)=>{
            console.log(data);
            done();
        });
        console.log('1.5');
        c1.emit('message','patata');
        console.log('1.6');

        // socket.on('connect', function(){
        //     console.log('conectado');
        // });
        // socket.on('event', function(data){
        //     console.log(data);
        // });
        // socket.on('disconnect', function(){
        //     console.log('desconectado');
        // });



        console.log('2');
        // c1.disconnect();

        // c1.on('connect', () => {
        //     console.log('banana')
        // });


        // ioServer.close();
        // httpServer.close();
        // done();

    });

});