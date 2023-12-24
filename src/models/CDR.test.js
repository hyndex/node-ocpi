const { CDR } = require('./CDR');
const { Location } = require('./Location');

describe('CDR Model', () => {
    it('validates a correct CDR instance', () => {
        const location = new Location(
            'loc1', 'ON_STREET', 'Main Street Charging Station', 
            '123 Main St', 'Anytown', '12345', 'USA', 
            { latitude: 52.520008, longitude: 13.404954 }
        );
        const cdr = new CDR(
            'cdr1', new Date(), new Date(), 'token1', 'WHITELIST', location, 
            'evse1', '1', 'meter1', 'EUR', 15.00, []
        );
        expect(() => cdr.validate()).not.toThrow();
    });

    it('throws an error for incorrect CDR instance', () => {
        const location = new Location(
            'loc1', 'ON_STREET', 'Main Street Charging Station', 
            '123 Main St', 'Anytown', '12345', 'USA', 
            { latitude: 52.520008, longitude: 13.404954 }
        );
        const cdr = new CDR(
            '', '', '', '', '', location, '', '', '', '', 0, []
        );
        expect(() => cdr.validate()).toThrow();
    });
});
