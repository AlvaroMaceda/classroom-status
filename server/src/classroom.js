const Students = require('./students');
const STUDENT_STATE = require('./student_state');

/*
const mySubject = new Rx.Subject();
const myObs = mySubject.asObservable();


http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged

.distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
http://reactivex.io/rxjs/manual/overview.html#behaviorsubject
 */

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