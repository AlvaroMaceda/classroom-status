const STUDENT_STATE = require ('./student_state');

const _id = Symbol('_id');
const _state = Symbol('_state');

class Student {

    constructor(id, state = STUDENT_STATE.UNKNOWN) {
        this[_id] = id;
        this[_state] = state;
    }

    get state() {
        return this[_state];
    }

    set state(state) {
        this[_state] = state;
    }

}

module.exports = Student;