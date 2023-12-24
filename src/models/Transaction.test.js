const { Transaction } = require('./Transaction');

describe('Transaction Model', () => {
    it('validates a correct Transaction instance', () => {
        const transaction = new Transaction('trans1', 20, new Date(),'PAYMENT_CARD');
        expect(() => transaction.validate()).not.toThrow();
    });

    it('throws an error for incorrect Transaction instance', () => {
        const transaction = new Transaction('', 0, '','');
        expect(() => transaction.validate()).toThrow();
    });
});
