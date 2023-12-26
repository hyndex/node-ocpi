const Joi = require('joi');

class OCPIResponse {
    constructor(statusCode, statusMessage, timestamp, data) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.timestamp = timestamp;
        this.data = data;
    }

    // Convert 'schema' to a static method
    static schema(modelSchema) {
        return Joi.object({
            statusCode: Joi.number().required(),
            statusMessage: Joi.string().allow(null, ''),
            timestamp: Joi.date().iso().required(),
            data: Joi.alternatives().try(
                modelSchema,
                Joi.array().items(modelSchema)
            ).required()
        });
    }
}


module.exports = OCPIResponse