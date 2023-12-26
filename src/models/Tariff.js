const Joi = require('joi');

// Enums:
const tariffDimensionTypeEnum = ["ENERGY", "FLAT", "PARKING_TIME", "TIME"];
const tariffTypeEnum = ["AD_HOC_PAYMENT", "PROFILE_CHEAP", "PROFILE_FAST", "PROFILE_GREEN", "REGULAR"];
const dayOfWeekEnum = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const reservationRestrictionTypeEnum = ["RESERVATION", "RESERVATION_EXPIRES"];

class Price {
    constructor(exclVat, inclVat) {
        this.exclVat = Number(exclVat);
        this.inclVat = inclVat ? Number(inclVat) : null;
    }

    static get schema() {
        return Joi.object({
            exclVat: Joi.number().required(),
            inclVat: Joi.number().optional()
        });
    }
}

class PriceComponent {
    constructor(type, price, vat, stepSize, name) {
        this.type = type;
        this.price = price;
        this.vat = vat;
        this.stepSize = stepSize;
        this.name = name;
    }

    static get schema() {
        return Joi.object({
            type: Joi.string().valid(...tariffDimensionTypeEnum).required(),
            price: Joi.number().required(),
            vat: Joi.number().optional(),
            stepSize: Joi.number().required(),
            name: Joi.string().optional()
        });
    }
}

class TariffRestrictions {
    constructor(startTime, endTime, startDate, endDate, minKwh, maxKwh, minCurrent, maxCurrent, minPower, maxPower, minDuration, maxDuration, dayOfWeek, reservation) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minKwh = minKwh;
        this.maxKwh = maxKwh;
        this.minCurrent = minCurrent;
        this.maxCurrent = maxCurrent;
        this.minPower = minPower;
        this.maxPower = maxPower;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
        this.dayOfWeek = dayOfWeek;
        this.reservation = reservation;
    }

    static get schema() {
        return Joi.object({
            startTime: Joi.string().length(5).optional(),
            endTime: Joi.string().length(5).optional(),
            startDate: Joi.string().length(10).optional(),
            endDate: Joi.string().length(10).optional(),
            minKwh: Joi.number().optional(),
            maxKwh: Joi.number().optional(),
            minCurrent: Joi.number().optional(),
            maxCurrent: Joi.number().optional(),
            minPower: Joi.number().optional(),
            maxPower: Joi.number().optional(),
            minDuration: Joi.number().optional(),
            maxDuration: Joi.number().optional(),
            dayOfWeek: Joi.array().items(Joi.string().valid(...dayOfWeekEnum)).optional(),
            reservation: Joi.string().valid(...reservationRestrictionTypeEnum).optional()
        });
    }
}

class TariffElement {
    constructor(priceComponents, restrictions) {
        this.priceComponents = priceComponents.map(pc => new PriceComponent(pc.type, pc.price, pc.vat, pc.stepSize, pc.name));
        this.restrictions = new TariffRestrictions(restrictions.startTime, restrictions.endTime, restrictions.startDate, restrictions.endDate, restrictions.minKwh, restrictions.maxKwh, restrictions.minCurrent, restrictions.maxCurrent, restrictions.minPower, restrictions.maxPower, restrictions.minDuration, restrictions.maxDuration, restrictions.dayOfWeek, restrictions.reservation);
    }

    static get schema() {
        return Joi.object({
            priceComponents: Joi.array().items(PriceComponent.schema).required(),
            restrictions: TariffRestrictions.schema.optional()
        });
    }
}

class Tariff {
    constructor(id, currency, type, elements) {
        this.id = String(id);
        this.currency = String(currency);
        this.type = type;
        this.elements = elements.map(el => new TariffElement(el.priceComponents, el.restrictions));
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            currency: Joi.string().required(),
            type: Joi.string().valid(...tariffTypeEnum).optional(),
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
