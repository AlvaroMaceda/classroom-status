const StatusBuilder = require('../src/classroom_status');

const _clients = Symbol('clients');

const FOLLOWING = Symbol('Following');
const LOST = Symbol('Lost');
const UNKNOWN = Symbol('Unknown');

function generateStatusFromClients(clients) {

    let count = {
        following: 0,
        lost: 0,
        unknown: 0
    };

    clients.forEach((client) => {
        switch (client.status) {
            case FOLLOWING:
                break;
            case LOST:
                break;
            case UNKNOWN:
                break;
        }

    });

    return new StatusBuilder()
        .following(count.following)
        .lost(count.lost)
        .unknown(count.unknown)
        .build();
}

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

    status(){
        return generateStatusFromClients(this[_clients]);
    }



}

module.exports = Classroom;