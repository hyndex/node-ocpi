const Joi = require('joi');

class User {
    constructor({ id, name, email, verified }) {
        this.id = String(id);
        this.name = String(name); // Full name of the user
        this.email = String(email); // Email address of the user
        this.verified = Boolean(verified); // Whether the user's email is verified
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            verified: Joi.boolean().required(),
         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}





module.exports =  User