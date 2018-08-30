const StatusBuilder = require('./classroom_status');

const FOLLOWING = Symbol('Following');
const LOST = Symbol('Lost');
const UNKNOWN = Symbol('Unknown');

function generateStatusFromStudents(students) {

    let count = {
        following: 0,
        lost: 0,
        unknown: 0
    };

    students.forEach((student) => {
        switch (student.getStatus) {
            case FOLLOWING:
                count.following++;
                break;
            case LOST:
                count.lost++;
                break;
            case UNKNOWN:
                count.unknown++;
                break;
        }
    });

    return (new StatusBuilder())
        .following(count.following)
        .lost(count.lost)
        .unknown(count.unknown)
        .build();
}

const _students = Symbol('_students');

class Students {

    constructor() {
        this[_students] = new Map();
    }

    add(student) {
        this[_students].set(student,{});
    }

    remove(student) {
        this[_students].delete(student);
    }

    count() {
        return this[_students].size;
    }

    getStatus(){
        return generateStatusFromStudents(this[_students]);
    }

}

module.exports = Students;
