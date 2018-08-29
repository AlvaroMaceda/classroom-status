const _clients = Symbol('clients');

class Classroom {

    constructor(){
        this[_clients] = new Map();
    }

    connect(id) {
        this[_clients].set(id,{});
    }

    disconnect(id) {
        this[_clients].delete(id);
    }

    count() {
        return this[_clients].size;
    }

}

module.exports = Classroom;