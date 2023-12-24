const Joi = require('joi');



class EVSE {
    constructor(uid, evse_id, status, capabilities, connectors, floor_level, coordinates, physical_reference, directions, parking_restrictions, images, charging_when_closed, last_updated, energy_mix, accessibility, related_evses, group_id, pricing_policy, realtime_data) {
        this.uid = String(uid);
        this.evse_id = String(evse_id);
        this.status = String(status);
        this.capabilities = capabilities || [];
        this.connectors = Array.isArray(connectors) ? connectors : [];
        this.floor_level = String(floor_level);
        this.coordinates = coordinates || {};
        this.physical_reference = String(physical_reference);
        this.directions = directions || [];
        this.parking_restrictions = parking_restrictions || [];
        this.images = images || [];
        this.charging_when_closed = Boolean(charging_when_closed);
        this.last_updated = new Date(last_updated).toISOString();
        this.energy_mix = energy_mix || {};
        this.accessibility = String(accessibility);
        this.related_evses = related_evses || [];
        this.group_id = String(group_id);
        this.pricing_policy = String(pricing_policy);
        this.realtime_data = Boolean(realtime_data);
    }

    validate() {
        const schema = Joi.object({
            uid: Joi.string().required(),
            evse_id: Joi.string().required(),
            status: Joi.string().required(),
            capabilities: Joi.array().items(Joi.string()), // Define a Joi schema for capabilities
            connectors: Joi.array().items(Joi.object()), // Define a Joi schema for connectors
            floor_level: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            }).required(),
            physical_reference: Joi.string().required(),
            directions: Joi.array().items(Joi.object()), // Define a Joi schema for directions
            parking_restrictions: Joi.array().items(Joi.string()), // Define a Joi schema for parking_restrictions
            images: Joi.array().items(Joi.object()), // Define a Joi schema for images
            charging_when_closed: Joi.boolean().required(),
            last_updated: Joi.string().required(),
            energy_mix: Joi.object(), // Define a Joi schema for energy_mix
            accessibility: Joi.string().required(),
            related_evses: Joi.array().items(Joi.string()), // Define a Joi schema for related_evses
            group_id: Joi.string().required(),
            pricing_policy: Joi.string().required(),
            realtime_data: Joi.boolean().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}


module.exports = {
    EVSE,
};
