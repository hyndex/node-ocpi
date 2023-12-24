const Joi = require('joi');

class Command {
    constructor(id, type, data) {
        this.id = String(id);
        this.type = String(type); // Type of command
        this.data = data; // Command data, varies based on command type
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            type: Joi.string().valid(
                'START_TRANSACTION',
                'STOP_TRANSACTION',
                'RESERVE_NOW',
                'UNLOCK_CONNECTOR',
                'RESET',
                'REMOTE_START_STOP'
                // Add more command types as needed
            ).required(),
            data: Joi.alternatives().conditional('type', {
                switch: [
                    // START_TRANSACTION command
                    {
                        is: 'START_TRANSACTION',
                        then: Joi.object({
                            connectorId: Joi.string().required(),
                            idTag: Joi.string().required(),
                            meterStart: Joi.number().required(),
                            reservationId: Joi.number().optional(),
                            chargingProfile: Joi.object({
                                chargingProfileId: Joi.string().required(),
                                stackLevel: Joi.number().required(),
                                chargingProfilePurpose: Joi.string().required(),
                                chargingProfileKind: Joi.string().required(),
                                chargingSchedule: Joi.array().items(Joi.object()).required()
                            }).optional(),
                        })
                    },
                    // STOP_TRANSACTION command
                    {
                        is: 'STOP_TRANSACTION',
                        then: Joi.object({
                            transactionId: Joi.string().required(),
                            meterStop: Joi.number().required(),
                            idTag: Joi.string().optional(),
                            reason: Joi.string().optional(),
                            transactionData: Joi.array().items(Joi.object({
                                timestamp: Joi.date().required(),
                                sampledValue: Joi.array().items(Joi.object()).required()
                            })).optional(),
                        })
                    },
                    // RESERVE_NOW command
                    {
                        is: 'RESERVE_NOW',
                        then: Joi.object({
                            connectorId: Joi.string().required(),
                            expiryDate: Joi.date().required(),
                            idTag: Joi.string().required(),
                            reservationId: Joi.number().required(),
                            parentIdTag: Joi.string().optional(),
                        })
                    },
                    // UNLOCK_CONNECTOR command
                    {
                        is: 'UNLOCK_CONNECTOR',
                        then: Joi.object({
                            connectorId: Joi.string().required(),
                        })
                    },
                    // RESET command
                    {
                        is: 'RESET',
                        then: Joi.object({
                            type: Joi.string().valid('HARD', 'SOFT').required(),
                        })
                    },
                    // REMOTE_START_STOP command
                    {
                        is: 'REMOTE_START_STOP',
                        then: Joi.object({
                            idTag: Joi.string().required(),
                            connectorId: Joi.string().required(),
                            chargingProfile: Joi.object({
                                chargingProfileId: Joi.string().required(),
                                stackLevel: Joi.number().required(),
                                chargingProfilePurpose: Joi.string().required(),
                                chargingProfileKind: Joi.string().required(),
                                chargingSchedule: Joi.array().items(Joi.object()).required()
                            }).optional(),
                        })
                    },
                ],
                otherwise: Joi.any().strip()
            })
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = Command