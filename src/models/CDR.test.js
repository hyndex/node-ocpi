const { CDR, Location } = require('./CDR');

describe('CDR Model', () => {
    it('should validate a correct CDR object', () => {
        const location = new Location('loc1', 'ON_STREET', 'Main Street Charging Station', 
            '123 Main St', 'Anytown', '12345', 'USA', 
            { latitude: 52.520008, longitude: 13.404954 });
        const cdr = new CDR(
            'cdr1', new Date(), new Date(), 'token1', 'WHITELIST', location, 
            'evse1', '1', 'meter1', 'EUR', 15.00, []
        );
        expect(() => cdr.validate()).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        const cdr = new CDR(
            '', new Date(), new Date(), '', '', null, '', '', '', '', 0, []
        );
        expect(() => cdr.validate()).toThrow();
    });
});
