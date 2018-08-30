const status = require ('./student_status');

const _status = Symbol('_status');

class Student {

    constructor(status = status.UNKNOWN) {
        this[_status] = status;
    }

}

module.exports = Student;