
const Students = require('./students');
const Student = require('./student');

const _students = Symbol('_students');

class Classroom {

    constructor(){
        this[_students] = new Students();
    }

    connect(student) {
        this[_students].add(student);
    }

    disconnect(student) {
        this[_students].remove(student);
    }

    count() {
        return this[_students].count();
    }

    getStatus(){
        return this[_students].getStatus();
    }

    isFollowing() {

    }


}

module.exports = Classroom;