const { expect } = require('chai');

const Classroom = require('../src/classroom');
const STUDENT_STATE = require('../src/student_state');

describe("Classroom", function() {

    const CLIENT_ID_1 = 'foo';
    const CLIENT_ID_2 = 'bar';
    const CLIENT_ID_3 = 'tee';

    let cs;

    beforeEach(function () {
        this.cs = new Classroom();
    });

    describe('Clients list', function () {

        it('should keep a count of connected clients', function () {
            let cs = new Classroom();

            cs.connect(CLIENT_ID_1);
            expect(cs.count()).to.equal(1);

            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);
            expect(cs.count()).to.equal(3);
        });

        it('should not connect a client twice', function () {
            let cs = new Classroom();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);
            expect(cs.count()).to.equal(3);

            cs.connect(CLIENT_ID_1);
            expect(cs.count()).to.equal(3);
        });
        it('should disconnect a client', function () {
            let cs = new Classroom();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.disconnect(CLIENT_ID_1);
            expect(cs.count()).to.equal(1);
        });

        it('should not faild if a non-existing client disconnects', function () {
            let cs = new Classroom();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.disconnect(CLIENT_ID_3);
            expect(cs.count()).to.equal(2);
        });

    });

    describe('Students status', function () {

        beforeEach(function () {
            this.cs = new Classroom();
            let clients = [
                CLIENT_ID_1,
                CLIENT_ID_2,
                CLIENT_ID_3
            ];
            clients.forEach( (client) => this.cs.connect(client) );
        });

        it('should return a default status', function () {
            let all_zeroes_status = {};
            for (const prop in STUDENT_STATE) {
                all_zeroes_status[STUDENT_STATE[prop]] = 0;
            }

            expect(new Classroom().getState()).to.deep.equal(all_zeroes_status );
        });

        it('should change status when clients indicates it', function () {
            let expected;

            this.cs.isFollowing(CLIENT_ID_2);
            expected = {
                [STUDENT_STATE.FOLLOWING]: 1,
                [STUDENT_STATE.LOST]: 0,
                [STUDENT_STATE.UNKNOWN]: 2
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.isFollowing(CLIENT_ID_3);
            expected = {
                [STUDENT_STATE.FOLLOWING]: 2,
                [STUDENT_STATE.LOST]: 0,
                [STUDENT_STATE.UNKNOWN]: 1
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.hasLost(CLIENT_ID_3);
            expected = {
                [STUDENT_STATE.FOLLOWING]: 1,
                [STUDENT_STATE.LOST]: 1,
                [STUDENT_STATE.UNKNOWN]: 1
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.hasLost(CLIENT_ID_1);
            expected = {
                [STUDENT_STATE.FOLLOWING]: 1,
                [STUDENT_STATE.LOST]: 2,
                [STUDENT_STATE.UNKNOWN]: 0
            };
            expect(this.cs.getState()).to.deep.equal(expected);
        });

        xit('should keep the last getStatus of a client', function () {
            this.cs.hasLost(CLIENT_ID_1);
            this.cs.hasLost(CLIENT_ID_1);
            expect(this.cs.getState()).to.equal({unknown:2,follow:0,lost:1});

            this.cs.hasLost(CLIENT_ID_1);
            this.cs.isFollowing(CLIENT_ID_1);
            expect(this.cs.getState()).to.equal({unknown:2,follow:1,lost:0});
        });

        xit('should change getStatus when a client connects', function () {

        });

        xit('should change getStatus when a client disconnects', function () {
            
        });

    });

});