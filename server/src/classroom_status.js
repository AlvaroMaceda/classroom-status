class ClassroomStatus {

    constructor(){
        this._count = 0;
    }

    connect() {
        this._count++;
    }

    count() {
        return this._count;
    }

}

module.exports = ClassroomStatus;