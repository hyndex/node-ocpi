const { User } = require('./User');

describe('User Model', () => {
    it('validates a correct User instance', () => {
        const user = new User('user1', 'userName', 'someEmail@example.com');
        expect(() => user.validate()).not.toThrow();
    });

    it('throws an error for incorrect User instance', () => {
        const user = new User('', '', '');
        expect(() => user.validate()).toThrow();
    });
});
