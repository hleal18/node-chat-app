const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    })
    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Humberto',
            room: 'The Office Fans'
        };

        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const id = users.users[1].id;
        const initialLength = users.users.length;
        const userRemoved = users.removeUser(id);
        const finalLength = users.users.length;
        expect(userRemoved).not.toBeNull();
        expect(userRemoved).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React Course'
        });
        expect(initialLength).toBe(finalLength + 1);
    });

    it('should not remove a user', () => {
        const id = '123';
        const initialLength = users.users.length;
        const userRemoved = users.removeUser(id);
        const finalLength = users.users.length;
        expect(userRemoved).not.toBeDefined();
        expect(initialLength).toBe(finalLength);
    });

    it('should find user', () => {
        const id = users.users[2].id;
        const user = users.getUser(id);
        expect(user).toBeDefined();
        expect(user).toEqual(users.users[2]);
    });

    it('should not find user', () => {
        const id = '123';
        const user = users.getUser(id);
        expect(user).not.toBeDefined();
    })

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList.length).toBe(2);
        expect(userList).toEqual([users.users[0].name, users.users[2].name]);
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');
        expect(userList.length).toBe(1);
        expect(userList).toEqual([users.users[1].name]);
    });
});