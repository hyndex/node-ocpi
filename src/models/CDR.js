const Joi = require('joi'); // Assuming Joi is used for validation

// Enums and Constants (based on your Python model)
const authMethodEnum = ['AUTH_REQUEST', 'COMMAND', 'WHITELIST'];
const cdrDimensionTypeEnum = [
    "CURRENT", "ENERGY", "ENERGY_EXPORT", "ENERGY_IMPORT", "MAX_CURRENT", "MIN_CURRENT",
    "MAX_POWER", "MIN_POWER", "PARKING_TIME", "POWER", "RESERVATION_TIME",
    "STATE_OF_CHARGE", "TIME"
];
const connectorTypeEnum = ["Type1", "Type2", "CCS", "CHAdeMO", "Other"]; // Example values
const connectorFormatEnum = ["Socket", "Cable"];
const powerTypeEnum = ["AC_1_PHASE", "AC_3_PHASE", "DC"];
const tokenTypeEnum = ["RFID", "APP_USER", "OTHER"]; // Example values

class CdrDimension {
    constructor(type, volume) {
        this.type = String(type);
        this.volume = Number(volume);
    }

    static get schema() {
        return Joi.object({ 
            type: Joi.string().valid(...cdrDimensionTypeEnum).required(),
            volume: Joi.number().required()
        });
    }
}

class GeoLocation {
    constructor(latitude, longitude) {
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
    }

    static get schema() {
        return Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        });
    }
}

class CdrLocation {
    constructor({id, name, address, city, postalCode, country, coordinates, evseUid, evseId, connectorId, connectorStandard, connectorFormat, connectorPowerType}) {
        this.id = String(id);
        this.name = String(name);
        this.address = String(address);
        this.city = String(city);
        this.postalCode = String(postalCode);
        this.country = String(country);
        this.coordinates = new GeoLocation(coordinates.latitude, coordinates.longitude);
        this.evseUid = String(evseUid);
        this.evseId = String(evseId);
        this.connectorId = String(connectorId);
        this.connectorStandard = String(connectorStandard);
        this.connectorFormat = String(connectorFormat);
        this.connectorPowerType = String(connectorPowerType);
    }

    static get schema() {
        return Joi.object({
            id: Joi.string().required(),
            name: Joi.string().optional(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            postalCode: Joi.string().required(),
            country: Joi.string().required(),
            coordinates: GeoLocation.schema.required(),
            evseUid: Joi.string().required(),
            evseId: Joi.string().required(),
            connectorId: Joi.string().optional(),
            connectorStandard: Joi.string().valid(...connectorTypeEnum).required(),
            connectorFormat: Joi.string().valid(...connectorFormatEnum).required(),
            connectorPowerType: Joi.string().valid(...powerTypeEnum).required()
        });
    }
}

class CdrToken {
    constructor({countryCode, partyId, uid, type, contractId}) {
        this.countryCode = String(countryCode);
        this.partyId = String(partyId);
        this.uid = String(uid);
        this.type = String(type);
        this.contractId = String(contractId);
    }

    static get schema() {
        return Joi.object({
            countryCode: Joi.string().length(2).required(),
            partyId: Joi.string().max(3).required(),
            uid: Joi.string().max(36).required(),
            type: Joi.string().valid(...tokenTypeEnum).required(),
            contractId: Joi.string().max(36).required()
        });
    }
}

class Price {
    constructor(amount, currency) {
        this.amount = Number(amount);
        this.currency = String(currency);
    }

    static get schema() {
        return Joi.object({
            amount: Joi.number().required(),
            currency: Joi.string().length(3).required()
        });
    }
}

class ChargingPeriod {
    constructor(startDateTime, dimensions, tariffId) {
        this.startDateTime = new Date(startDateTime);
        this.dimensions = dimensions.map(d => new CdrDimension(d.type, d.volume));
        this.tariffId = String(tariffId);
    }

    static get schema() {
        return Joi.object({ 
            startDateTime: Joi.date().required(),
            dimensions: Joi.array().items(CdrDimension.schema).required(),
            tariffId: Joi.string().optional() 
        });
    }
}

class CDR {
    constructor({id, startDateTime, endDateTime, authId, authMethod, location, evseId, connectorId, meterId, currency, totalCost, chargingPeriods, totalEnergy, totalTime, lastUpdated, stopReason, totalParkingTime, totalReservationCost, remark, signedData, relatedCDRs, locationReference, productData, chargingPreferences, environmentalImpact, cdrToken}) {
        this.id = String(id);
        this.startDateTime = new Date(startDateTime);
        this.endDateTime = new Date(endDateTime);
        this.authId = String(authId);
        this.authMethod = String(authMethod);
        this.location = new CdrLocation(location);
        this.evseId = String(evseId);
        this.connectorId = String(connectorId);
        this.meterId = String(meterId);
        this.currency = String(currency);
        this.totalCost = new Price(totalCost.amount, totalCost.currency);
        this.chargingPeriods = chargingPeriods.map(period => new ChargingPeriod(period.startDateTime, period.dimensions, period.tariffId));
        this.totalEnergy = Number(totalEnergy);
        this.totalTime = Number(totalTime);
        this.lastUpdated = new Date(lastUpdated).toISOString();
        this.stopReason = String(stopReason);
        this.totalParkingTime = Number(totalParkingTime);
        this.totalReservationCost = Number(totalReservationCost);
        this.remark = String(remark);
        this.signedData = String(signedData);
        this.relatedCDRs = relatedCDRs || [];
        this.locationReference = locationReference || {};
        this.productData = productData || {};
        this.chargingPreferences = chargingPreferences || {};
        this.environmentalImpact = environmentalImpact || {};
        this.cdrToken = new CdrToken(cdrToken);
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            startDateTime: Joi.date().required(),
            endDateTime: Joi.date().required(),
            authId: Joi.string().required(),
            authMethod: Joi.string().valid(...authMethodEnum).required(),
            location: CdrLocation.schema.required(),
            evseId: Joi.string().required(),
            connectorId: Joi.string().required(),
            meterId: Joi.string().required(),
            currency: Joi.string().length(3).required(),
            totalCost: Price.schema.required(),
            chargingPeriods: Joi.array().items(ChargingPeriod.schema).required(),
            totalEnergy: Joi.number().required(),
            totalTime: Joi.number().required(),
            lastUpdated: Joi.string().isoDate().required(),
            stopReason: Joi.string().optional(),
            totalParkingTime: Joi.number().optional(),
            totalReservationCost: Joi.number().optional(),
            remark: Joi.string().optional(),
            signedData: Joi.string().optional(),
            relatedCDRs: Joi.array().items(Joi.string()).optional(),
            locationReference: Joi.object().optional(),
            productData: Joi.object().optional(),
            chargingPreferences: Joi.object().optional(),
            environmentalImpact: Joi.object().optional(),
            cdrToken: CdrToken.schema.required()
         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = CDR;
