const { Command } = require('./Command');

describe('Command Model', () => {
    it('should validate a correct Command object', () => {
        const command = new Command(
            'cmd1', 'START_TRANSACTION', 
            { connectorId: '1', idTag: 'tag1', meterStart: 123456 }
        );
        expect(() => command.validate()).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        const command = new Command(
            '', 'INVALID_TYPE', {}
        );
        expect(() => command.validate()).toThrow();
    });
});
