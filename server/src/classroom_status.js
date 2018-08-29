class ClassroomStatus {

    constructor(following, lost, unknown) {
        this.following = following;
        this.lost = lost;
        this.unknown = unknown;
        return Object.freeze(this);
    }

    equal(another) {
        return this.following === another.following && this.lost === another.lost && this.unknown === another.unknown;
    }
}

const _following = Symbol('following');
const _lost = Symbol('lost');
const _unknown = Symbol('unknown');

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