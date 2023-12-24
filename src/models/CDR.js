const Joi = require('joi');


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
        this.chargingPeriods = Array.isArray(chargingPeriods) ? chargingPeriods : [];
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
            chargingPeriods: Joi.array().items(Joi.object()), // You should define a Joi schema for ChargingPeriod
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
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = {
    CDR,
};
