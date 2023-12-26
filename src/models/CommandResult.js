const Joi = require('joi');

class CommandResult {
    constructor({result, message}) {
        this.result = result; // Result of the command request
        this.message = message; // Human-readable description of the result
    }

    validate() {
        const schema = Joi.object({
            result: Joi.string().valid(
                'ACCEPTED',
                'CANCELED_RESERVATION',
                'EVSE_OCCUPIED',
                'EVSE_INOPERATIVE',
                'FAILED',
                'NOT_SUPPORTED',
                'REJECTED',
                'TIMEOUT',
                'UNKNOWN_RESERVATION'
            ).required(),
            message: Joi.string().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

const Joi = require('joi');

class CommandResponse {
    constructor({ result, timeout, message }) {
        this.result = result;
        this.timeout = timeout;
        this.message = message;
    }

    validate() {
        const schema = Joi.object({
            result: Joi.string().valid(
                'NOT_SUPPORTED',
                'REJECTED',
                'ACCEPTED',
                'UNKNOWN_SESSION'
            ).required(),
            timeout: Joi.number().positive(), // Ensuring timeout is a positive number
            message: Joi.string().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = {
    CommandResult,
    CommandResponse,
};


