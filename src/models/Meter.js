const Joi = require('joi');


class Meter {
    constructor(id, value, timestamp) {
        this.id = String(id);
        this.value = Number(value); // Meter value
        this.timestamp = new Date(timestamp); // Timestamp of the meter reading
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            value: Joi.number().required(),
            timestamp: Joi.date().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}


module.exports = Meter