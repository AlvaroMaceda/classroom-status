const { expect } = require('chai');

const StatusBuilder = require('../src/classroom_status');

describe('Classroom Status', function () {

    it('should create statuses', function () {

        const FOLLOWING = 1;
        const LOST = 2;
        const UNKNOW = 3;

        let status = new StatusBuilder().following(1).lost(2).unknown(3).build();

        expect(status.following).to.equal(FOLLOWING);
        expect(status.lost).to.equal(LOST);
        expect(status.unknown).to.equal(UNKNOW);
    });

    xit('should compare properties', function () {
        
    });

    xit('should not be posible to change it', function () {

    });

});