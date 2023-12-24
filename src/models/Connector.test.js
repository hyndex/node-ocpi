const { Connector } = require('./Connector');

describe('Connector Model', () => {
    it('validates a correct Connector instance', () => {
        const connector = new Connector(
            '1', 'IEC_62196_T2', 'CABLE', 'AC_3_PHASE', 400, 16, 22, 
            new Date()
        );
        expect(() => connector.validate()).not.toThrow();
    });

    it('throws an error for incorrect Connector instance', () => {
        const connector = new Connector(
            '', '', '', '', 0, 0, 0, new Date()
        );
        expect(() => connector.validate()).toThrow();
    });
});
