const Location = require('./Location'); // Ensure the Location model is in the correct path

class Dimension {
    constructor(type, volume) {
        this.type = String(type);
        this.volume = Number(volume);
    }

    static get schema() {
        return Joi.object({ 
            type: Joi.string().required(),
            volume: Joi.number().required()
         });
    }
}

class ChargingPeriod {
    constructor(startDateTime, dimensions) {
        this.startDateTime = new Date(startDateTime);
        this.dimensions = dimensions.map(d => new Dimension(d.type, d.volume));
    }

    static get schema() {
        return Joi.object({ 
            startDateTime: Joi.date().required(),
            dimensions: Joi.array().items(Dimension.schema).required()
         });
    }
}

class Token {
    constructor({ uid, type, authId, visualNumber, issuer, valid, whitelist, language, lastUpdated }) {
        this.uid = String(uid);
        this.type = String(type);
        this.authId = String(authId);
        this.visualNumber = String(visualNumber);
        this.issuer = String(issuer);
        this.valid = Boolean(valid);
        this.whitelist = String(whitelist);
        this.language = String(language);
        this.lastUpdated = new Date(lastUpdated);
    }

    static get schema() {
        return Joi.object({ 
            uid: Joi.string().required(),
            type: Joi.string().required(),
            authId: Joi.string().required(),
            visualNumber: Joi.string().required(),
            issuer: Joi.string().required(),
            valid: Joi.boolean().required(),
            whitelist: Joi.string().required(),
            language: Joi.string().required(),
            lastUpdated: Joi.date().required()
         });
    }
}

class CDR {
    constructor(id, startDateTime, endDateTime, authId, authMethod, location, evseId, connectorId, meterId, currency, totalCost, chargingPeriods, totalEnergy, totalTime, lastUpdated, stopReason, totalParkingTime, totalReservationCost, remark, signedData, relatedCDRs, locationReference, productData, chargingPreferences, environmentalImpact) {
        this.id = String(id);
        this.startDateTime = new Date(startDateTime);
        this.endDateTime = new Date(endDateTime);
        this.authId = String(authId);
        this.authMethod = String(authMethod);
        this.location = location instanceof Location ? location : null;
        this.evseId = String(evseId);
        this.connectorId = String(connectorId);
        this.meterId = String(meterId);
        this.currency = String(currency);
        this.totalCost = Number(totalCost);
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

        this.cdrToken = new Token(cdrToken.uid, cdrToken.type, cdrToken.authId, cdrToken.visualNumber, cdrToken.issuer, cdrToken.valid, cdrToken.whitelist, cdrToken.language, cdrToken.lastUpdated);
        this.chargingPeriods = chargingPeriods.map(period => new ChargingPeriod(period.startDateTime, period.dimensions));
  
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            startDateTime: Joi.date().required(),
            endDateTime: Joi.date().required(),
            authId: Joi.string().required(),
            authMethod: Joi.string().required(),
            location: Joi.object().required(), // You should define a Joi schema for Location
            evseId: Joi.string().required(),
            connectorId: Joi.string().required(),
            meterId: Joi.string().required(),
            currency: Joi.string().required(),
            totalCost: Joi.number().required(),
            totalEnergy: Joi.number().required(),
            totalTime: Joi.number().required(),
            lastUpdated: Joi.string().required(),
            stopReason: Joi.string(), // Optional field, add validation logic if needed
            totalParkingTime: Joi.number(), // Optional field, add validation logic if needed
            totalReservationCost: Joi.number(), // Optional field, add validation logic if needed
            remark: Joi.string(), // Optional field, add validation logic if needed
            signedData: Joi.string(), // Optional field, add validation logic if needed
            relatedCDRs: Joi.array().items(Joi.string()), // You should define a Joi schema for related CDRs
            locationReference: Joi.object(), // You should define a Joi schema for LocationReference
            productData: Joi.object(), // You should define a Joi schema for ProductData
            chargingPreferences: Joi.object(), // You should define a Joi schema for ChargingPreferences
            environmentalImpact: Joi.object(), // You should define a Joi schema for EnvironmentalImpact

            cdrToken: Token.schema.required(),
            chargingPeriods: Joi.array().items(ChargingPeriod.schema).required(),

         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = CDR

