const Joi = require('joi');

class PriceComponent {
    constructor(type, price, stepSize) {
        this.type = String(type);
        this.price = Number(price);
        this.stepSize = Number(stepSize);
    }

    static get schema() {
        return Joi.object({ 
            type: Joi.string().required(),
            price: Joi.number().required(),
            stepSize: Joi.number().required()
         });
    }
}

class TariffElement {
    constructor(priceComponents) {
        this.priceComponents = priceComponents.map(pc => new PriceComponent(pc.type, pc.price, pc.stepSize));
    }

    static get schema() {
        return Joi.object({ 
            priceComponents: Joi.array().items(PriceComponent.schema).required()
         });
    }
}

class Tariff {
    constructor({ id, currency, elements }) {
        this.id = String(id);
        this.currency = String(currency); // Currency code, e.g., 'EUR'
        this.elements = elements.map(el => new TariffElement(el.priceComponents));
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            currency: Joi.string().required(),
            elements: Joi.array().items(TariffElement.schema).required()
         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = Tariff;
