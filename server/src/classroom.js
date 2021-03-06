let { BehaviorSubject } = require('rxjs');
let { map, filter, switchMap, debounceTime, throttleTime, distinctUntilChanged} = require('rxjs/operators');

const Students = require('./students');
const STUDENT_STATE = require('./student_states');

/*
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinctUntilChanged
.distinctUntilChanged((p: Person, q: Person) => p.name === q.name)

 */

function compareStates(previous, current){
    return previous.isEqualTo(current)
}


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

    getStatesStream() {
        return this._stateStream$ || this._initializeStateStream();
    }

    //---------------------------------------------------
    // "Private" methods
    //---------------------------------------------------

    _initializeStateSubject() {
        this._stateSubject = new BehaviorSubject(this.getState());
        return this._stateSubject;
    }

    _getStateSubject() {
        return this._stateSubject || this._initializeStateSubject();
    }

    _initializeStateStream() {
        this._stateStream$ = this._getStateSubject()
            .asObservable()
            .pipe(distinctUntilChanged(
                (previous, next) => previous.isEqualTo(next)
            ));
        return this._stateStream$;
    }

    _notify() {
        let state = this.getState();
        let subject = this._getStateSubject();
        subject.next(state);
    }

}

module.exports = Classroom;