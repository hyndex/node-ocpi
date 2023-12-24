const Joi = require('joi');

class Feedback {
    constructor({ id, rating, comment, userId }) {
        this.id = String(id);
        this.rating = Number(rating); // Rating given by the user
        this.comment = String(comment); // Feedback comment
        this.userId = String(userId); // Identifier of the user who provided the feedback
    }

    validate() {
        const schema = Joi.object({ 
            id: Joi.string().required(),
            rating: Joi.number().required(),
            comment: Joi.string().required(),
            userId: Joi.string().required(),
         });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}

module.exports = Feedback