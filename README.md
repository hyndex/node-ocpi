# node-ocpi Library Documentation

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/hyndex/node-ocpi)
[![Made with Love](https://img.shields.io/badge/made%20with-love-ff69b4)](https://github.com/hyndex/node-ocpi)
[![Electric Vehicle](https://img.shields.io/badge/electric-vehicle-blue)](https://github.com/hyndex/node-ocpi)
[![Eco Friendly](https://img.shields.io/badge/eco-friendly-green)](https://github.com/hyndex/node-ocpi)
[![Tree](https://img.shields.io/badge/tree-%F0%9F%8C%B3-green)](https://github.com/hyndex/node-ocpi)

## Overview

`node-ocpi` is a Node.js library designed for the implementation of the Open Charge Point Interface (OCPI) protocol. It provides structured models and validation for various OCPI entities, making it ideal for developers building applications for EV charging stations and related services.

## Features

- Models for key OCPI entities: `Location`, `EVSE`, `Connector`, `CDR`, `Command`, `Transaction`, `Feedback`, `Meter`, `Reservation`, `Tariff`, `User`.
- Comprehensive validation for OCPI-compliant data structures.
- Supports a wide range of OCPI operations and functionalities.

## Installation

You can install `node-ocpi` using npm with the following command:

```bash
npm install https://github.com/hyndex/node-ocpi
```

This command fetches and installs the library directly from the specified GitHub repository.

## Usage

Import the models you need from the `node-ocpi` library as follows:

```javascript
const { Location, EVSE, Connector, CDR, Command, Transaction, Feedback, Meter, Reservation, Tariff, User } = require('node-ocpi');
```

### Model Usage Examples

Below are examples showing how to create instances of each model and perform data validation using objects as input:

#### Location

```javascript
const locationData = {
  id: 'loc1',
  type: 'ON_STREET',
  name: 'Main Street Charging Station',
  address: '123 Main St',
  city: 'Anytown',
  postalCode: '12345',
  country: 'USA',
  coordinates: { latitude: 52.520008, longitude: 13.404954 },
  // Other properties as needed
};

const location = new Location(locationData);
location.validate();
```

#### EVSE

```javascript
const evseData = {
  uid: 'evse1',
  locationId: 'loc1',
  // Other properties as needed
};

const evse = new EVSE(evseData);
evse.validate();
```

#### Connector

```javascript
const connectorData = {
  id: '1',
  standard: 'IEC_62196_T2',
  // Other properties as needed
};

const connector = new Connector(connectorData);
connector.validate();
```

#### CDR

```javascript
const cdrData = {
  id: 'cdr1',
  startDateTime: '2023-01-01T00:00:00Z',
  // Other properties as needed
};

const cdr = new CDR(cdrData);
cdr.validate();
```

... (Continue with other models in a similar fashion)

## Using `node-ocpi` as Middleware in Express.js

You can use `node-ocpi` as middleware in Express.js applications to handle OCPI data:

```javascript
const express = require('express');
const { Location, EVSE, Connector, CDR } = require('node-ocpi');

const app = express();
app.use(express.json());

// Example: POST route for adding a new charging location
app.post('/locations', (req, res) => {
  try {
    const location = new Location(req.body);
    location.validate();
    // Save location to database or handle as needed
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// More routes and logic...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the `node-ocpi` library is used to validate incoming data for a new charging location.

## Contributing

Contributions to `node-ocpi` are always welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Implement your feature or bug fix.
4. Write or adapt tests as needed.
5. Update the documentation.
6. Commit and push your changes.
7. Submit a pull request.

## License

`node-ocpi` is released under the MIT License. See the [LICENSE](LICENSE.md) file for more details.