const Joi = require('joi');

class Connector {
    constructor({ id, standard, format, powerType, maxVoltage, maxAmperage, maxElectricPower, voltage, amperage, tariff_id, last_updated, terms_and_conditions, phase_to_phase_voltage, phase, pricing, parking_spot, accessibility, authentication_modes, identification_restrictions, payment_methods, supported_energy_mix }) {
        this.id = String(id);
        this.standard = String(standard);
        this.format = String(format);
        this.powerType = String(powerType);
        this.maxVoltage = Number(maxVoltage);
        this.maxAmperage = Number(maxAmperage);
        this.maxElectricPower = Number(maxElectricPower);
        this.voltage = Number(voltage);
        this.amperage = Number(amperage);
        this.tariff_id = String(tariff_id);
        this.last_updated = new Date(last_updated);
        this.terms_and_conditions = String(terms_and_conditions);
        this.phase_to_phase_voltage = Number(phase_to_phase_voltage);
        this.phase = Number(phase);
        this.pricing = pricing || {};
        this.parking_spot = String(parking_spot);
        this.accessibility = String(accessibility);
        this.authentication_modes = authentication_modes || [];
        this.identification_restrictions = identification_restrictions || [];
        this.payment_methods = payment_methods || [];
        this.supported_energy_mix = supported_energy_mix || {};
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            standard: Joi.string().required(),
            format: Joi.string().required(),
            powerType: Joi.string().required(),
            maxVoltage: Joi.number().required(),
            maxAmperage: Joi.number().required(),
            maxElectricPower: Joi.number().required(),
            voltage: Joi.number().required(),
            amperage: Joi.number().required(),
            tariff_id: Joi.string().required(),
            last_updated: Joi.string().required(),
            terms_and_conditions: Joi.string().required(),
            phase_to_phase_voltage: Joi.number().required(),
            phase: Joi.number().required(),
            pricing: Joi.object(), // Define a Joi schema for pricing
            parking_spot: Joi.string().required(),
            accessibility: Joi.string().required(),
            authentication_modes: Joi.array().items(Joi.string()), // Define a Joi schema for authentication_modes
            identification_restrictions: Joi.array().items(Joi.string()), // Define a Joi schema for identification_restrictions
            payment_methods: Joi.array().items(Joi.string()), // Define a Joi schema for payment_methods
            supported_energy_mix: Joi.object(), // Define a Joi schema for supported_energy_mix
         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}



module.exports = Connector