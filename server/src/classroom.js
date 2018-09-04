let { BehaviorSubject } = require('rxjs');
let { map, filter, switchMap, debounceTime, throttleTime, distinctUntilChanged} = require('rxjs/operators');

const Students = require('./students');
const STUDENT_STATE = require('./student_state');

/*
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged
.distinctUntilChanged((p: Person, q: Person) => p.name === q.name)

 */

// I dont like this, is ugly

// const _students = Symbol('_students');
// const _statusSubject = Symbol('_statusSubject');
// const _statusStream =Symbol('_statusStream');
//
// const _initializeStatusStream = Symbol('_initializeStatusStream');
// const _initializeStatusSubject = Symbol('_initializeStatusSubject');
// const _getStatusSubject = Symbol('_getStatusSubject');
// const _notify = Symbol('_notify');

class Classroom {

    constructor(){
        this._students = new Students();
    }

    connect(studentId) {
        this._students.add(studentId);
        this._notify();
    }

    disconnect(studentId) {
        this._students.remove(studentId);
    }

    count() {
        return this._students.count();
    }

    getState(){
        return this._students.getState();
    }

    isFollowing(studentId) {
        this._students.get(studentId).state = STUDENT_STATE.FOLLOWING;
        this._notify();
    }

    hasLost(studentId) {
        this._students.get(studentId).state = STUDENT_STATE.LOST;
        this._notify();
    }

    getStatusStream() {
        return this._statusStream || this._initializeStatusStream();
    }

    //---------------------------------------------------
    // "Private" methods
    //---------------------------------------------------

    _initializeStatusSubject() {
        this._statusSubject = new BehaviorSubject(this.getState());
        return this._statusSubject;
    }

    _getStatusSubject() {
        return this._statusSubject || this._initializeStatusSubject();
    }

    _initializeStatusStream() {
        this._statusStream = this._getStatusSubject().asObservable();
        return this._statusStream;
    }

    _notify() {
        let state = this.getState();
        let subject = this._getStatusSubject();
        subject.next(state);
    }

}

module.exports = Classroom;