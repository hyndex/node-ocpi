const Joi = require('joi');


class Transaction {
    constructor(id, meterStart, timestamp, idTag) {
        this.id = String(id);
        this.meterStart = Number(meterStart); // Meter value in Wh at start of the transaction
        this.timestamp = new Date(timestamp); // Timestamp marking the start of the transaction
        this.idTag = String(idTag); // Identifier that will be used for authorization
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            meterStart: Joi.number().required(),
            timestamp: Joi.date().required(),
            idTag: Joi.string().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = Transaction