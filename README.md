# node-ocpi Library Documentation

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/hyndex/node-ocpi)
[![Made with Love](https://img.shields.io/badge/made%20with-love-ff69b4)](https://github.com/hyndex/node-ocpi)
[![Electric Vehicle](https://img.shields.io/badge/electric-vehicle-blue)](https://github.com/hyndex/node-ocpi)
[![Eco Friendly](https://img.shields.io/badge/eco-friendly-green)](https://github.com/hyndex/node-ocpi)
[![Tree](https://img.shields.io/badge/tree-%F0%9F%8C%B3-green)](https://github.com/hyndex/node-ocpi)

## Overview

`node-ocpi` is a comprehensive Node.js library tailored for implementing the Open Charge Point Interface (OCPI) protocol. This library provides structured models and robust validation for a variety of OCPI entities, offering an essential toolkit for developers involved in electric vehicle (EV) charging station applications and services.

## Features

- Extensive models for key OCPI entities: `Location`, `EVSE`, `Connector`, `CDR`, `Command`, `Feedback`, `Meter`, `Reservation`, `Tariff`, `User`, `Transaction`, `Credentials`, `ChargingProfile`, `Token`, and more.
- Comprehensive validation for OCPI-compliant data structures to ensure data integrity.
- Supports a diverse range of OCPI operations and functionalities, facilitating the development of robust EV charging station services.

## Installation

Install `node-ocpi` via npm with the following command:

```bash
npm install https://github.com/hyndex/node-ocpi
```

This command installs the library directly from the GitHub repository.

## Usage

Import the required models from `node-ocpi` as follows:

```javascript
const {
    Location, EVSE, Connector, CDR, Command, Feedback, Meter, Reservation, Tariff, User, Transaction, Credentials,
    ChargingProfilePeriod, ChargingProfile, ActiveChargingProfile, ChargingProfileResponse, ActiveChargingProfileResult, ChargingProfileResult, ClearProfileResult, SetChargingProfile,
    CommandResult, CommandResponse,
    DisplayText,
    EnergyContract, LocationReferences, Token, AuthorizationInfo
} = require('node-ocpi');
```

### Model Usage Examples

Below are examples demonstrating how to instantiate and validate each model:

#### Location Example

```javascript
const location = new Location({ /* Location data */ });
location.validate();
```

#### EVSE Example

```javascript
const evse = new EVSE({ /* EVSE data */ });
evse.validate();
```

#### Connector Example

```javascript
const connector = new Connector({ /* Connector data */ });
connector.validate();
```

#### CDR Example

```javascript
const cdr = new CDR({ /* CDR data */ });
cdr.validate();
```

#### Tariff Example

```javascript
const tariff = new Tariff({ /* Tariff data */ });
tariff.validate();
```

... (Continue with other models similarly)

## Integration with Express.js

`node-ocpi` can be seamlessly integrated as middleware in Express.js applications for handling OCPI data:

```javascript
const express = require('express');
const { Location } = require('node-ocpi');

const app = express();
app.use(express.json());

// Example: POST route for a new charging location
app.post('/locations', (req, res) => {
  try {
    const location = new Location(req.body);
    location.validate();
    // Process location (e.g., save to database)
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// More routes and logic...

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Contributing

We welcome contributions to `node-ocpi`. To contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Implement your feature or bug fix.
4. Write or adapt tests as needed.
5. Update the documentation.
6. Commit and push your changes.
7. Submit a pull request.

## License

`node-ocpi` is available under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
