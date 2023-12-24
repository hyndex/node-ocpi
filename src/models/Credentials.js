const Joi = require('joi');

class Logo {
  constructor(url, category, type, width, height) {
    this.url = url;
    this.category = category;
    this.type = type;
    this.width = width;
    this.height = height;
  }

  validate() {
    const schema = Joi.object({ 
      url: Joi.string().uri().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      width: Joi.number().integer().required(),
      height: Joi.number().integer().required()
     });
    return this._validateWithSchema(schema);
  }

  _validateWithSchema(schema) {
    const { error } = schema.validate(this);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }
    return true;
  }
}

class BusinessDetails {
  constructor(name, website, logo) {
    this.name = name;
    this.website = website;
    this.logo = logo instanceof Logo ? logo : null;
  }

  validate() {
    const schema = Joi.object({ 
      name: Joi.string().required(),
      website: Joi.string().uri().optional(),
      logo: Joi.object().type(Logo).optional()
     });
    return this._validateWithSchema(schema);
  }

  _validateWithSchema(schema) {
    const { error } = schema.validate(this);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }
    return true;
  }
}

class Credentials {
  constructor({ token, url, businessDetails, partyId, countryCode, role }) {
    this.token = token;
    this.url = url;
    this.business_details = businessDetails instanceof BusinessDetails ? businessDetails : null;
    this.party_id = partyId;
    this.country_code = countryCode;
    this.role = role;
  }

  validate() {
    const schema = Joi.object({ 
      token: Joi.string().required(),
      url: Joi.string().uri().required(),
      business_details: Joi.object().type(BusinessDetails).required(),
      party_id: Joi.string().required(),
      country_code: Joi.string().required(),
      role: Joi.string().valid('CPO', 'EMSP', 'HUB', 'OCPP', 'OTHER').required()
     });
    return this._validateWithSchema(schema);
  }

  _validateWithSchema(schema) {
    const { error } = schema.validate(this);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }
    return true;
  }
}

module.exports = Credentials