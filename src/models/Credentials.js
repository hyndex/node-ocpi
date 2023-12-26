const Joi = require('joi');

class Logo {
  constructor({ url, category, type, width, height }) {
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
  constructor({ name, website, logo }) {
    this.name = name;
    this.website = website;
    this.logo = logo ? new Logo(logo) : null;
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

class CredentialsRole {
  constructor({ role, businessDetails, partyId, countryCode }) {
    this.role = role;
    this.business_details = businessDetails ? new BusinessDetails(businessDetails) : null;
    this.party_id = partyId;
    this.country_code = countryCode;
}

  validate() {
    const schema = Joi.object({ 
      role: Joi.string().valid('CPO', 'EMSP', 'HUB', 'OCPP', 'OTHER').required(), // Adjust based on Python's `role` enum
      business_details: Joi.object().type(BusinessDetails).required(),
      party_id: Joi.string().max(3).required(),
      country_code: Joi.string().length(2).required()
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
  constructor({ token, url, roles }) {
    this.token = token;
    this.url = url;
    this.roles = roles.map(role => new CredentialsRole(role));
}


  validate() {
    const schema = Joi.object({ 
      token: Joi.string().required(),
      url: Joi.string().uri().required(),
      roles: Joi.array().items(Joi.object().type(CredentialsRole)).required()
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

module.exports = Credentials;