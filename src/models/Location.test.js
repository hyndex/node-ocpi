const { Location } = require('./Location');

describe('Location Model', () => {
    it('should validate a correct Location object', () => {
        const location = new Location(
            'loc1', 'ON_STREET', 'Main Street Charging Station', 
            '123 Main St', 'Anytown', '12345', 'USA', 
            { latitude: 52.520008, longitude: 13.404954 }
        );
        expect(() => location.validate()).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        const location = new Location(
            'loc1', 'ON_STREET', '', 
            '123 Main St', 'Anytown', '12345', 'USA', 
            { latitude: 52.520008, longitude: 13.404954 }
        );
        expect(() => location.validate()).toThrow();
    });
});
