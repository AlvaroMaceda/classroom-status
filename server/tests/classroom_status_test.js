const { expect } = require('chai');

const StatusBuilder = require('../src/classroom_status');

describe('ClassroomStatus', function () {

    it('should create statuses', function () {

        const FOLLOWING = 1;
        const LOST = 2;
        const UNKNOW = 3;

        let status = new StatusBuilder().following(FOLLOWING).lost(LOST).unknown(UNKNOW).build();

        expect(status.following).to.equal(FOLLOWING);
        expect(status.lost).to.equal(LOST);
        expect(status.unknown).to.equal(UNKNOW);
    });

    it('should compare properties', function () {

        const FOLLOWING = 155;
        const LOST = 20;
        const UNKNOW = 3;
        const RUBBISH = 9999;

        let status1 = new StatusBuilder().following(FOLLOWING).lost(LOST).unknown(UNKNOW).build();
        let status2 = new StatusBuilder().following(FOLLOWING).lost(LOST).unknown(UNKNOW).build();

        expect(status1.equal(status2)).to.be.true;
        expect(status2.equal(status1)).to.be.true;

        status2 = new StatusBuilder().following(RUBBISH).lost(LOST).unknown(UNKNOW).build();
        expect(status1.equal(status2)).to.be.false;
        expect(status2.equal(status1)).to.be.false;

        status2 = new StatusBuilder().following(FOLLOWING).lost(RUBBISH).unknown(UNKNOW).build();
        expect(status1.equal(status2)).to.be.false;
        expect(status2.equal(status1)).to.be.false;

        status2 = new StatusBuilder().following(FOLLOWING).lost(LOST).unknown(RUBBISH).build();
        expect(status1.equal(status2)).to.be.false;
        expect(status2.equal(status1)).to.be.false;

    });

    it('should not be posible to change it', function () {

        const SOMETHING = 12;
        const ANOTHER_VALUE = 22;

        let status = new StatusBuilder().following(SOMETHING).lost(SOMETHING).unknown(SOMETHING).build();

        expect(() => status.following = ANOTHER_VALUE).to.throw();
        expect(() => status.lost = ANOTHER_VALUE).to.throw();
        expect(() => status.unknown = ANOTHER_VALUE).to.throw();
    });

});