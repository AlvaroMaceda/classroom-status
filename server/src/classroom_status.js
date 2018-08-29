const _following = Symbol('following');
const _lost = Symbol('lost');
const _unknown = Symbol('unknown');

class ClassroomStatus {

    constructor(following, lost, uknown) {
        return Object.freeze(this);
    }

}

class StatusBuilder {

    constructor() {
        this[_following] = 0;
        this[_lost] = 0;
        this[_unknown] = 0;
    }

    following(num) { this[_following] = num; }

    lost(num) { this[_lost] = num; }

    unknown(num) { this[_unknown] = num; }

    build() {
        return new ClassroomStatus(this[_following],this[_lost],this[_unknown]);
    }

}

module.exports = StatusBuilder;