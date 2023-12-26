const Joi = require('joi');

// Enums
const allowedTypeEnum = ["ALLOWED", "BLOCKED", "EXPIRED", "NO_CREDIT", "NOT_ALLOWED"];
const tokenTypeEnum = ["AD_HOC_USER", "APP_USER", "OTHER", "RFID"];
const whitelistTypeEnum = ["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"];
const profileTypeEnum = ["CHEAP", "FAST", "GREEN", "REGULAR"];

// EnergyContract Class
class EnergyContract {
    constructor({ supplierName, contractId }) {
        this.supplierName = supplierName;
        this.contractId = contractId;
    }

    static get schema() {
        return Joi.object({
            supplierName: Joi.string().max(64).required(),
            contractId: Joi.string().max(64).optional()
        });
    }
}

// LocationReferences Class
class LocationReferences {
    constructor({ locationId, evseUids }) {
        this.locationId = locationId;
        this.evseUids = evseUids || [];
    }

    static get schema() {
        return Joi.object({
            locationId: Joi.string().max(36).required(),
            evseUids: Joi.array().items(Joi.string().max(36))
        });
    }
}

// DisplayText Class
class DisplayText {
    constructor(language, text) {
        this.language = language;
        this.text = text;
    }

    static get schema() {
        return Joi.object({
            language: Joi.string().max(2).required(),
            text: Joi.string().max(512).required()
        });
    }
}

// Token Class
class Token {
    constructor({ countryCode, partyId, uid, type, contractId, visualNumber, issuer, groupId, valid, whitelist, language, defaultProfileType, energyContract, lastUpdated }) {
        this.countryCode = countryCode;
        this.partyId = partyId;
        this.uid = uid;
        this.type = type;
        this.contractId = contractId;
        this.visualNumber = visualNumber;
        this.issuer = issuer;
        this.groupId = groupId;
        this.valid = valid;
        this.whitelist = whitelist;
        this.language = language;
        this.defaultProfileType = defaultProfileType;
        this.energyContract = energyContract ? new EnergyContract(energyContract) : null;
        this.lastUpdated = lastUpdated;
    }


    static get schema() {
        return Joi.object({
            countryCode: Joi.string().max(2).required(),
            partyId: Joi.string().max(3).required(),
            uid: Joi.string().max(36).required(),
            type: Joi.string().valid(...tokenTypeEnum).required(),
            contractId: Joi.string().max(36).required(),
            visualNumber: Joi.string().max(64).optional(),
            issuer: Joi.string().max(64).required(),
            groupId: Joi.string().max(36).optional(),
            valid: Joi.boolean().required(),
            whitelist: Joi.string().valid(...whitelistTypeEnum).required(),
            language: Joi.string().max(2).optional(),
            defaultProfileType: Joi.string().valid(...profileTypeEnum).optional(),
            energyContract: EnergyContract.schema.optional(),
            lastUpdated: Joi.date().iso().required()
        });
    }
}

class AuthorizationInfo {
    constructor({ allowed, token, location, authorizationReference, info }) {
        this.allowed = allowed;
        this.token = new Token(token);
        this.location = location ? new LocationReferences(location) : null;
        this.authorizationReference = authorizationReference;
        this.info = info ? new DisplayText(info) : null;
    }

    static get schema() {
        return Joi.object({
            allowed: Joi.string().valid(...allowedTypeEnum).required(),
            token: Token.schema.required(),
            location: LocationReferences.schema.optional(),
            authorizationReference: Joi.string().max(36).optional(),
            info: DisplayText.schema.optional()
        });
    }
}

module.exports = {
    EnergyContract,
    LocationReferences,
    DisplayText,
    Token,
    AuthorizationInfo
};
