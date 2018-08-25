const ClassroomStatus = require('../src/classroom_status');

const { expect } = require('chai');

describe("ClassroomStatus", function() {
    it("foos", function() {
        let cs = new ClassroomStatus();
        expect(cs.foo()).to.equal('bar');
    });
});