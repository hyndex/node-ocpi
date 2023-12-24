// Placeholder content
const Joi = require('joi');

class Location {
    constructor(id, type, name, address, city, postalCode, country, coordinates, relatedLocations, parkingType, evse, facilities, time_zone, opening_times, charging_when_closed, images, energy_mix, business_details, operator, suboperator, owner, clearinghouse) {
        this.id = String(id);
        this.type = String(type);
        this.name = String(name);
        this.address = String(address);
        this.city = String(city);
        this.postalCode = String(postalCode);
        this.country = String(country);
        this.coordinates = coordinates;
        this.relatedLocations = relatedLocations || [];
        this.parkingType = String(parkingType);
        this.evse = Array.isArray(evse) ? evse : [];
        this.facilities = facilities || [];
        this.time_zone = String(time_zone);
        this.opening_times = opening_times || {};
        this.charging_when_closed = Boolean(charging_when_closed);
        this.images = images || [];
        this.energy_mix = energy_mix || {};
        this.business_details = business_details || {};
        this.operator = operator || {};
        this.suboperator = suboperator || {};
        this.owner = owner || {};
        this.clearinghouse = clearinghouse || {};
        this.last_updated = new Date().toISOString();
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            type: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            postalCode: Joi.string().required(),
            country: Joi.string().required(),
            coordinates: Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            }).required(),
            relatedLocations: Joi.array().items(Joi.object()), // Define a Joi schema for relatedLocations
            parkingType: Joi.string().required(),
            evse: Joi.array().items(Joi.object()), // Define a Joi schema for EVSE
            facilities: Joi.array().items(Joi.string()), // Define a Joi schema for facilities
            time_zone: Joi.string().required(),
            opening_times: Joi.object(), // Define a Joi schema for opening_times
            charging_when_closed: Joi.boolean().required(),
            images: Joi.array().items(Joi.object()), // Define a Joi schema for images
            energy_mix: Joi.object(), // Define a Joi schema for energy_mix
            business_details: Joi.object(), // Define a Joi schema for business_details
            operator: Joi.object(), // Define a Joi schema for operator
            suboperator: Joi.object(), // Define a Joi schema for suboperator
            owner: Joi.object(), // Define a Joi schema for owner
            clearinghouse: Joi.object(), // Define a Joi schema for clearinghouse
            last_updated: Joi.string().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}



module.exports = Location;
