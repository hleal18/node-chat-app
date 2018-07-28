class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const index = this.users.findIndex((user) => user.id === id);
        this.users.splice(index, 1);
    }

    getUser(id) {
        const user = this.users.find((user) => user.id === id);
        return user;
    }

    getUsersList(room) {
        const usersList = this.users.filter((user) => user.room === room);
        return usersList;
    }
}

module.exports = {
    Users
}