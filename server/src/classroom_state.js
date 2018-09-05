//https://www.npmjs.com/package/value-object
const ValueObject = require('value-object'); 
const STUDENT_STATE = require('./student_states');

function createFieldsForEachStudentStates() {
    let fields = {};
    for (const item in STUDENT_STATE) {
        fields[STUDENT_STATE[item]] = 'number';
    }
    return fields;
}

let fields = createFieldsForEachStudentStates();

class ClassroomState extends ValueObject.define(fields) {
    // Hint for the linter. Constructor is not necessary.
    constructor(...args) {super(...args);}
}

module.exports = ClassroomState;