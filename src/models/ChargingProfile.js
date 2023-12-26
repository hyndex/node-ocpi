const Joi = require('joi');

// Enums
const chargingProfileResponseTypeEnum = ["ACCEPTED", "NOT_SUPPORTED", "REJECTED", "TOO_OFTEN", "UNKNOWN_SESSION"];
const chargingProfileResultTypeEnum = ["ACCEPTED", "REJECTED", "UNKNOWN"];
const chargingRateUnitEnum = ["W", "A"];

// ChargingProfilePeriod Class
class ChargingProfilePeriod {
    constructor({ startPeriod, limit }) {
        this.startPeriod = startPeriod;
        this.limit = limit;
    }
    static get schema() {
        return Joi.object({
            startPeriod: Joi.number().integer().required(),
            limit: Joi.number().required()
        });
    }
}

// ChargingProfile Class
class ChargingProfile {
    constructor({ startDateTime, duration, chargingRateUnit, minChargingRate, chargingProfilePeriod }) {
        this.startDateTime = startDateTime;
        this.duration = duration;
        this.chargingRateUnit = chargingRateUnit;
        this.minChargingRate = minChargingRate;
        this.chargingProfilePeriod = chargingProfilePeriod.map(period => new ChargingProfilePeriod(period));
    }

    static get schema() {
        return Joi.object({
            startDateTime: Joi.date().iso().optional(),
            duration: Joi.number().integer().optional(),
            chargingRateUnit: Joi.string().valid(...chargingRateUnitEnum).required(),
            minChargingRate: Joi.number().optional(),
            chargingProfilePeriod: Joi.array().items(ChargingProfilePeriod.schema).required()
        });
    }
}

// ActiveChargingProfile Class
class ActiveChargingProfile {
    constructor({ startDateTime, chargingProfile }) {
        this.startDateTime = startDateTime;
        this.chargingProfile = new ChargingProfile(chargingProfile);
    }

    static get schema() {
        return Joi.object({
            startDateTime: Joi.date().iso().required(),
            chargingProfile: ChargingProfile.schema.required()
        });
    }
}

// ChargingProfileResponse Class
class ChargingProfileResponse {
    constructor({ result, timeout }) {
        this.result = result;
        this.timeout = timeout;
    }

    static get schema() {
        return Joi.object({
            result: Joi.string().valid(...chargingProfileResponseTypeEnum).required(),
            timeout: Joi.number().integer().required()
        });
    }
}

// ActiveChargingProfileResult Class
class ActiveChargingProfileResult {
    constructor({ result, profile }) {
        this.result = result;
        this.profile = profile ? new ActiveChargingProfile(profile) : null;
    }

    static get schema() {
        return Joi.object({
            result: Joi.string().valid(...chargingProfileResultTypeEnum).required(),
            profile: ActiveChargingProfile.schema.optional()
        });
    }
}

// ChargingProfileResult Class
class ChargingProfileResult {
    constructor({ result }) {
        this.result = result;
    }
    static get schema() {
        return Joi.object({
            result: Joi.string().valid(...chargingProfileResultTypeEnum).required()
        });
    }
}

// ClearProfileResult Class
class ClearProfileResult {
    constructor({ result }) {
        this.result = result;
    }

    static get schema() {
        return Joi.object({
            result: Joi.string().valid(...chargingProfileResultTypeEnum).required()
        });
    }
}

// SetChargingProfile Class
class SetChargingProfile {
    constructor({ chargingProfile, responseUrl }) {
        this.chargingProfile = new ChargingProfile(chargingProfile);
        this.responseUrl = responseUrl;
    }

    static get schema() {
        return Joi.object({
            chargingProfile: ChargingProfile.schema.required(),
            responseUrl: Joi.string().uri().required()
        });
    }
}

module.exports = {
    ChargingProfilePeriod,
    ChargingProfile,
    ActiveChargingProfile,
    ChargingProfileResponse,
    ActiveChargingProfileResult,
    ChargingProfileResult,
    ClearProfileResult,
    SetChargingProfile
};
