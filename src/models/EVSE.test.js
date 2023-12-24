const { EVSE } = require('./EVSE');

describe('EVSE Model', () => {
    it('should validate a correct EVSE object', () => {
        const evse = new EVSE(
            'evse1', 'loc1', 'AVAILABLE', ['CHADEMO'], 
            { latitude: 52.520008, longitude: 13.404954 }, '1', new Date().toISOString()
        );
        expect(() => evse.validate()).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        const evse = new EVSE(
            '', '', 'INVALID', [], {}, '', ''
        );
        expect(() => evse.validate()).toThrow();
    });
});
