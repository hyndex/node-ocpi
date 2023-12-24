const { Connector } = require('./Connector');

describe('Connector Model', () => {
    it('should validate a correct Connector object', () => {
        const connector = new Connector(
            '1', 'IEC_62196_T2', 'CABLE', 'AC_3_PHASE', 400, 16, 22, 
            new Date().toISOString()
        );
        expect(() => connector.validate()).not.toThrow();
    });

    it('should throw an error for invalid data', () => {
        const connector = new Connector(
            '', '', '', '', 0, 0, 0, ''
        );
        expect(() => connector.validate()).toThrow();
    });
});
