const Students = require('./students');
const STUDENT_STATE = require('./student_state');

const _students = Symbol('_students');

class Classroom {

    constructor(){
        this[_students] = new Students();
    }

    connect(studentId) {
        this[_students].add(studentId);
    }

    disconnect(studentId) {
        this[_students].remove(studentId);
    }

    count() {
        return this[_students].count();
    }

    getState(){
        return this[_students].getState();
    }

    isFollowing(studentId) {
        this[_students].get(studentId).state = STUDENT_STATE.FOLLOWING;
    }

    hasLost(studentId) {
        this[_students].get(studentId).state = STUDENT_STATE.LOST;
    }


}

module.exports = Classroom;