const { Command } = require('./Command');

describe('Command Model', () => {
    it('validates a correct Command instance', () => {
        const command = new Command(
            'cmd1', 'START_TRANSACTION', 
            { connectorId: '1', idTag: 'tag1', meterStart: 123456 }
        );
        expect(() => command.validate()).not.toThrow();
    });

    it('throws an error for incorrect Command instance', () => {
        const command = new Command(
            '', 'INVALID_TYPE', {}
        );
        expect(() => command.validate()).toThrow();
    });
});
