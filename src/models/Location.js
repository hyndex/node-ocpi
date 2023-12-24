const Joi = require('joi');
const EVSE = require('./EVSE');

// Coordinates Submodel
class Coordinates {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static get schema() {
        return Joi.object({ 
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
         });
    }
}

// OpeningTimes Submodel
class OpeningTimes {
    constructor(regularHours, exceptionalOpenings, exceptionalClosings) {
        this.regularHours = regularHours || [];
        this.exceptionalOpenings = exceptionalOpenings || [];
        this.exceptionalClosings = exceptionalClosings || [];
    }

    static get schema() {
        return Joi.object({ 
            regularHours: Joi.array().items(RegularHours.schema),
            exceptionalOpenings: Joi.array().items(ExceptionalPeriod.schema),
            exceptionalClosings: Joi.array().items(ExceptionalPeriod.schema),
         });
    }
}

// RegularHours Submodel
class RegularHours {
    constructor(weekday, periodBegin, periodEnd) {
        this.weekday = weekday;
        this.periodBegin = periodBegin;
        this.periodEnd = periodEnd;
    }

    static get schema() {
        return Joi.object({ 
            weekday: Joi.number().integer().min(1).max(7).required(),
            periodBegin: Joi.string().required(),
            periodEnd: Joi.string().required(),
         });
    }
}

// ExceptionalPeriod Submodel
class ExceptionalPeriod {
    constructor(periodBegin, periodEnd) {
        this.periodBegin = periodBegin;
        this.periodEnd = periodEnd;
    }

    static get schema() {
        return Joi.object({ 
            periodBegin: Joi.string().required(),
            periodEnd: Joi.string().required(),
         });
    }
}

// Facility Submodel
class Facility {
    constructor(type) {
        this.type = type;
    }

    static get schema() {
        return Joi.object({ 
            type: Joi.string().required(),
         });
    }
}


class EnergyMix {
    constructor(isGreenEnergy, energySources, environImpact, supplierName, energyProductName) {
        this.isGreenEnergy = isGreenEnergy;
        this.energySources = energySources || [];
        this.environImpact = environImpact || [];
        this.supplierName = supplierName;
        this.energyProductName = energyProductName;
    }

    static get schema() {
        return Joi.object({ 
            isGreenEnergy: Joi.boolean().required(),
            energySources: Joi.array().items(Joi.object({ 
                source: Joi.string().required(),
                percentage: Joi.number().required(),
             })),
            environImpact: Joi.array().items(Joi.object({ 
                category: Joi.string().required(),
                amount: Joi.number().required(),
             })),
            supplierName: Joi.string().required(),
            energyProductName: Joi.string().required(),
         });
    }
}

// Image Submodel
class Image {
    constructor(url, thumbnail, category, type, width, height) {
        this.url = url;
        this.thumbnail = thumbnail;
        this.category = category;
        this.type = type;
        this.width = width;
        this.height = height;
    }

    static get schema() {
        return Joi.object({ 
            url: Joi.string().uri().required(),
            thumbnail: Joi.string().uri(),
            category: Joi.string(),
            type: Joi.string().required(),
            width: Joi.number().integer(),
            height: Joi.number().integer(),
         });
    }
}

// BusinessDetails Submodel
class BusinessDetails {
    constructor(name, website, logo) {
        this.name = name;
        this.website = website;
        this.logo = logo; // Instance of Image class
    }

    static get schema() {
        return Joi.object({ 
            name: Joi.string().required(),
            website: Joi.string().uri(),
            logo: Image.schema,
         });
    }
}

// Location Class
class Location {
    constructor({ id, type, name, address, city, postalCode, country, coordinates, relatedLocations, parkingType, evse, facilities, time_zone, opening_times, charging_when_closed, images, energy_mix, business_details, operator, suboperator, owner, clearinghouse }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.coordinates = new Coordinates(coordinates.latitude, coordinates.longitude);
        this.relatedLocations = relatedLocations || [];
        this.parkingType = parkingType;
        this.evse = evse.map(evseData => new EVSE(evseData.id, evseData.status, evseData.capabilities, evseData.connectors, evseData.floor_level, evseData.coordinates, evseData.physical_reference, evseData.directions, evseData.parking_restrictions, evseData.images, evseData.charging_when_closed, evseData.last_updated, evseData.energy_mix, evseData.accessibility, evseData.related_evses, evseData.group_id, evseData.pricing_policy, evseData.realtime_data));
        this.facilities = facilities.map(facility => new Facility(facility.type));
        this.time_zone = time_zone;
        this.opening_times = new OpeningTimes(opening_times.regularHours, opening_times.exceptionalOpenings, opening_times.exceptionalClosings);
        this.charging_when_closed = charging_when_closed;
        this.images = images.map(image => new Image(image.url, image.thumbnail, image.category, image.type, image.width, image.height));
        this.energy_mix = new EnergyMix(energy_mix.isGreenEnergy, energy_mix.energySources, energy_mix.environImpact, energy_mix.supplierName, energy_mix.energyProductName);
        this.business_details = new BusinessDetails(business_details.name, business_details.website, business_details.logo);
        this.operator = operator; // Details about the operator
        this.suboperator = suboperator; // Details about the suboperator
        this.owner = owner; // Details about the owner
        this.clearinghouse = clearinghouse; // Details about the clearinghouse
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
            coordinates: Coordinates.schema.required(),
            relatedLocations: Joi.array().items(Joi.object()), // Define a Joi schema for relatedLocations
            parkingType: Joi.string().required(),
            evse: Joi.array().items(EVSE.schema), // Define a Joi schema for EVSE
            facilities: Joi.array().items(Facility.schema.required()),
            time_zone: Joi.string().required(),
            opening_times: OpeningTimes.schema.required(),
            charging_when_closed: Joi.boolean().required(),
            images: Joi.array().items(Image.schema.required()),
            energy_mix: EnergyMix.schema, // Define a Joi schema for EnergyMix
            business_details: BusinessDetails.schema.required(),
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
