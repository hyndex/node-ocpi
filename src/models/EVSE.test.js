const { EVSE } = require('./EVSE');

describe('EVSE Model', () => {
    it('validates a correct EVSE instance', () => {
        const evse = new EVSE(
            'evse1', 'loc1', 'AVAILABLE', ['CHADEMO'], 
            { latitude: 52.520008, longitude: 13.404954 }, 
            '1', new Date()
        );
        expect(() => evse.validate()).not.toThrow();
    });

    it('throws an error for incorrect EVSE instance', () => {
        const evse = new EVSE(
            '', '', 'INVALID', [], {}, '', new Date()
        );
        expect(() => evse.validate()).toThrow();
    });
});
