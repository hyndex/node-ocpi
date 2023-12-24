const Joi = require('joi');

class Tariff {
    constructor(id, currency, elements) {
        this.id = String(id);
        this.currency = String(currency); // Currency code, e.g., 'EUR'
        this.elements = Array.isArray(elements) ? elements : []; // Array of pricing elements
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            currency: Joi.string().required(),
            elements: Joi.array().items(Joi.object()), // Define a Joi schema for pricing elements
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}


module.exports = Tariff