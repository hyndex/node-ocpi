const Joi = require('joi');

class Reservation {
    constructor(id, expiryDate, idTag, reservationId) {
        this.id = String(id);
        this.expiryDate = new Date(expiryDate); // Expiry date and time of the reservation
        this.idTag = String(idTag); // Identifier that will be used for authorization
        this.reservationId = Number(reservationId); // Unique reservation id
    }

    validate() {
        const schema = Joi.object({
            id: Joi.string().required(),
            expiryDate: Joi.date().required(),
            idTag: Joi.string().required(),
            reservationId: Joi.number().required(),
        });

        const { error } = schema.validate(this);

        if (error) {
            throw new Error(error.details.map((detail) => detail.message).join(', '));
        }

        return true; // Data is valid
    }
}


module.exports = {
    Reservation,
};
