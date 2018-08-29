const ClassroomStatus = require('../src/classroom_status');

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

        xit('should not connect a client twice', function () {
            let cs = new ClassroomStatus();

            cs.connect(CLIENT_ID_1);
            cs.connect(CLIENT_ID_2);
            cs.connect(CLIENT_ID_3);
            expect(cs.count()).to.equal(3);

            cs.connect(CLIENT_ID_1);
            expect(cs.count()).to.equal(3);
        });

        xit('should disconnect a client', function () {

        });

        xit('should not faild if a non-existing client disconnects', function () {

        });

    });


});