const ClassroomStatus = require('../src/classroom');

const { expect } = require('chai');

describe("ClassroomStatus", function() {

    const CLIENT_ID_1 = 'foo';
    const CLIENT_ID_2 = 'bar';
    const CLIENT_ID_3 = 'tee';


    let cs;

    beforeEach(function () {
        this.cs = new ClassroomStatus();
    });

    describe('Clients list', function () {

        it('should keep a count of connected clients', function () {
            let cs = new ClassroomStatus();

            cs.connect(CLIENT_ID_1);
            expect(cs.count()).to.equal(1);

            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);
            expect(cs.count()).to.equal(3);
        });

        it('should not connect a client twice', function () {
            let cs = new ClassroomStatus();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);
            expect(cs.count()).to.equal(3);

            cs.connect(CLIENT_ID_1);
            expect(cs.count()).to.equal(3);
        });
        it('should disconnect a client', function () {
            let cs = new ClassroomStatus();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.disconnect(CLIENT_ID_1);
            expect(cs.count()).to.equal(1);
        });

        it('should not faild if a non-existing client disconnects', function () {
            let cs = new ClassroomStatus();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.disconnect(CLIENT_ID_3);
            expect(cs.count()).to.equal(2);
        });

    });

    describe('Understanding status', function () {

        beforeEach(function () {
            this.cs = new ClassroomStatus();
        });

        it('should return a default status', function () {
            const ALL_ZEROES_STATUS = {
                unknown: 0,
                follow: 0,
                lost: 0
            };

            expect(this.cs.status).to.equal(ALL_ZEROES_STATUS );
        });

        xit('should change status when clients indicates it', function () {
            this.cs.isFollowing(CLIENT_ID_2);
            expect(this.css.status).to.equal({unknown:2,follow:1,lost:0});

            this.cs.isFollowing(CLIENT_ID_3);
            expect(this.css.status).to.equal({unknown:1,follow:2,lost:0});

            this.cs.hasLost(CLIENT_ID_3);
            expect(this.css.status).to.equal({unknown:1,follow:1,lost:1});

            this.cs.hasLost(CLIENT_ID_1);
            expect(this.css.status).to.equal({unknown:0,follow:1,lost:2});
        });

        xit('should keep the last status of a client', function () {
            this.cs.hasLost(CLIENT_ID_1);
            this.cs.hasLost(CLIENT_ID_1);
            expect(this.css.status).to.equal({unknown:2,follow:0,lost:1});

            this.cs.hasLost(CLIENT_ID_1);
            this.cs.isFollowing(CLIENT_ID_1);
            expect(this.css.status).to.equal({unknown:2,follow:1,lost:0});
        });

        xit('should change status when a client connects', function () {

        });

        xit('should change status when a client disconnects', function () {
            
        });

    });

});