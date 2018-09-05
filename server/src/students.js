const STUDENT_STATE = require('./student_states');
const Student = require('./student');
let ClassroomState = require('../src/classroom_state');

function coalesce(...args) {
    return args.find( (item) => item !== null && item !== undefined);
}

function zeroCountHash() {
    let count = {};
    for (const item in STUDENT_STATE) {
        count[STUDENT_STATE[item]] = 0;
    }
    return count;

}

function generateStatusFromStudents(students) {
    let count = zeroCountHash();

    students.forEach((student) => {
        count[student.state]++
    });

    return new ClassroomState(count);
}

const _students = Symbol('_students');

class Students {

    constructor() {
        this[_students] = new Map();
    }

    add(studentId) {
        this[_students].set(studentId,new Student(studentId,STUDENT_STATE.UNKNOWN));
    }

    remove(student) {
        this[_students].delete(student);
    }

    count() {
        return this[_students].size;
    }

    get(studentId) {
        return this[_students].get(studentId);
    }

    getState(){
        return generateStatusFromStudents(this[_students]);
    }

}

module.exports = Students;
