const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
use(sinonChai);

const Classroom = require('../src/classroom');
const STUDENT_STATE = require('../src/student_states');

const FOLLOWING = STUDENT_STATE.FOLLOWING;
const LOST = STUDENT_STATE.LOST;
const UNKNOWN = STUDENT_STATE.UNKNOWN;

function createDefaultStatus() {
    let all_zeroes_status = {};
    for (const prop in STUDENT_STATE) {
        all_zeroes_status[STUDENT_STATE[prop]] = 0;
    }
    return all_zeroes_status;
}

describe("Classroom", function() {

    const CLIENT_ID_1 = 'foo';
    const CLIENT_ID_2 = 'bar';
    const CLIENT_ID_3 = 'tee';
    const CLIENT_ID_4 = 'goo';

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

        it('should not fail if a non-existing client disconnects', function () {
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
            let defaultStatus = createDefaultStatus();

            expect(new Classroom().getState()).to.deep.equal(defaultStatus);
        });

        it('should change status when clients indicates it', function () {
            let expected;

            this.cs.isFollowing(CLIENT_ID_2);
            expected = {
                [FOLLOWING]: 1,
                [LOST]: 0,
                [UNKNOWN]: 2
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.isFollowing(CLIENT_ID_3);
            expected = {
                [FOLLOWING]: 2,
                [LOST]: 0,
                [UNKNOWN]: 1
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.hasLost(CLIENT_ID_3);
            expected = {
                [FOLLOWING]: 1,
                [LOST]: 1,
                [UNKNOWN]: 1
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.hasLost(CLIENT_ID_1);
            expected = {
                [FOLLOWING]: 1,
                [LOST]: 2,
                [UNKNOWN]: 0
            };
            expect(this.cs.getState()).to.deep.equal(expected);
        });

        it('should keep the last status of a client', function () {
            let expected;

            this.cs.hasLost(CLIENT_ID_1);
            this.cs.hasLost(CLIENT_ID_1);
            expected = {
                [FOLLOWING]: 0,
                [LOST]: 1,
                [UNKNOWN]: 2
            };
            expect(this.cs.getState()).to.deep.equal(expected);

            this.cs.hasLost(CLIENT_ID_1);
            this.cs.isFollowing(CLIENT_ID_1);
            expected = {
                [FOLLOWING]: 1,
                [LOST]: 0,
                [UNKNOWN]: 2
            };
            expect(this.cs.getState()).to.deep.equal(expected);
        });

        it('should change status when a client connects', function () {

            this.cs.connect(CLIENT_ID_4);

            let expected = {
                [FOLLOWING]: 0,
                [LOST]: 0,
                [UNKNOWN]: 4
            };
            expect(this.cs.getState()).to.deep.equal(expected);

        });

        it('should change status when a client disconnects', function () {

            this.cs.hasLost(CLIENT_ID_1);
            this.cs.hasLost(CLIENT_ID_2);
            this.cs.isFollowing(CLIENT_ID_3);

            this.cs.disconnect(CLIENT_ID_3);

            let expected = {
                [FOLLOWING]: 0,
                [LOST]: 2,
                [UNKNOWN]: 0
            };
            expect(this.cs.getState()).to.deep.equal(expected);

        });

    });

    describe('Stream of notifications', function () {

        it('should notify a default value to new subscribers', function () {
            let cs = new Classroom();
            let defaultStatus = createDefaultStatus();

            let callback =  sinon.spy();
            cs.getStatesStream().subscribe(callback);

            let anotherCallback =  sinon.spy();
            cs.getStatesStream().subscribe(anotherCallback);

            expect(callback).to.have.been.calledWith(defaultStatus);
            expect(anotherCallback).to.have.been.calledWith(defaultStatus);
        });

        it('should notify when a client connects', function () {
            let cs = new Classroom();
            let callback = sinon.spy();

            let expected = {
                [FOLLOWING]: 0,
                [LOST]: 0,
                [UNKNOWN]: 1
            };

            cs.getStatesStream().subscribe(callback);
            cs.connect(CLIENT_ID_1);
            expect(callback).to.have.been.calledWith(expected);
        });

        it('should notify when a students follows or get lost', function () {
            let expected;
            let cs = new Classroom();
            let callback = sinon.spy();
            cs.getStatesStream().subscribe(callback);

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);

            expected = {
                [FOLLOWING]: 1,
                [LOST]: 0,
                [UNKNOWN]: 2
            };
            cs.isFollowing(CLIENT_ID_1);
            expect(callback).to.have.been.calledWith(expected);

            expected = {
                [FOLLOWING]: 0,
                [LOST]: 1,
                [UNKNOWN]: 2
            };
            cs.hasLost(CLIENT_ID_1);
            expect(callback).to.have.been.calledWith(expected);

        });

        it('should not notify when the status is the same as before', function () {
            let expected;
            let previousCallCount;

            let cs = new Classroom();
            let callback = sinon.spy();

            cs.getStatesStream().subscribe(callback);
            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);


            cs.isFollowing(CLIENT_ID_1);
            previousCallCount = callback.callCount;
            cs.isFollowing(CLIENT_ID_1);

            expect(callback.callCount).to.equal(previousCallCount);

            cs.hasLost(CLIENT_ID_2);
            previousCallCount = callback.callCount;
            cs.hasLost(CLIENT_ID_2);

            expect(callback.callCount).to.equal(previousCallCount);
        });

    });
    
});