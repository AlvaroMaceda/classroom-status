const _following = Symbol('following');
const _lost = Symbol('lost');
const _unknown = Symbol('unknown');

function readOnly(){
    throw "Read only property";
}

// Value object
class ClassroomStatus {

    constructor(following, lost, unknown) {
        this[_following] = following;
        this[_lost] = lost;
        this[_unknown] = unknown;
        return Object.freeze(this);
    }

    get following() { return this[_following]; }
    get lost() { return this[_lost]; }
    get unknown() { return this[_unknown];}

    set following(something) { readOnly();}
    set lost(something) { readOnly();}
    set unknown(something) { readOnly();}

    equal(another) {
        return this[_following] === another.following && this[_lost] === another.lost && this[_unknown] === another.unknown;
    }
}


class StatusBuilder {

    constructor() {
        this[_following] = 0;
        this[_lost] = 0;
        this[_unknown] = 0;
    }

    following(num) { this[_following] = num; return this; }

    lost(num) { this[_lost] = num; return this; }

    unknown(num) { this[_unknown] = num; return this; }

    build() {
        return new ClassroomStatus(this[_following],this[_lost],this[_unknown]);
    }

}

module.exports = StatusBuilder;