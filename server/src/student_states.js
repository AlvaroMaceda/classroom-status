// Mocha doesn't seem to work well with symbols (30/8/2018)
const STUDENT_STATE = {
    FOLLOWING: 'FOLLOWING', //Symbol('Following'),
    LOST: 'LOST', //Symbol('Lost'),
    UNKNOWN: 'UNKNOWN' //Symbol('Unknown')
};

module.exports = STUDENT_STATE;
