const Joi = require('joi');

// Utility function to convert string to uppercase for case-insensitive processing
const caseInsensitiveString = (value, helpers) => {
    if (typeof value !== 'string') {
        return helpers.error('any.invalid');
    }
    return value.toUpperCase();
};

// DisplayText class
class DisplayText {
    constructor({ language, text }) {
        this.language = language;
        this.text = text;
    }

    static get schema() {
        return Joi.object({
            language: Joi.string().length(2).required().custom(caseInsensitiveString, 'case insensitive processing'),
            text: Joi.string().max(512).required()
        });
    }

    validate() {
        const { error } = DisplayText.schema.validate(this);
        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }
        return true; // Valid object
    }
}

// Role enumeration
const roleEnum = ["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"];

// Example Usage
let exampleText = new DisplayText('en', 'Example text for display.');
try {
    exampleText.validate();
    console.log('Validation successful:', exampleText);
} catch (error) {
    console.error('Validation failed:', error.message);
}

module.exports = {
    DisplayText,
    roleEnum
};
