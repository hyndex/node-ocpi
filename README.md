# node-ocpi Library Documentation

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/hyndex/node-ocpi)
[![Made with Love](https://img.shields.io/badge/made%20with-love-ff69b4)](https://github.com/hyndex/node-ocpi)
[![Electric Vehicle](https://img.shields.io/badge/electric-vehicle-blue)](https://github.com/hyndex/node-ocpi)
[![Eco Friendly](https://img.shields.io/badge/eco-friendly-green)](https://github.com/hyndex/node-ocpi)
[![Tree](https://img.shields.io/badge/tree-%F0%9F%8C%B3-green)](https://github.com/hyndex/node-ocpi)

## Overview

`node-ocpi` is an advanced Node.js library designed for implementing the Open Charge Point Interface (OCPI) protocol. Offering structured models and comprehensive validation for various OCPI entities, it serves as an essential toolkit for developers in the electric vehicle (EV) charging station domain.

## Features

- Extensive models for key OCPI entities including `Location`, `EVSE`, `Connector`, `CDR`, `Command`, `Feedback`, `Meter`, `Reservation`, `Tariff`, `User`, `Transaction`, `Credentials`, `ChargingProfilePeriod`, `ChargingProfile`, `ActiveChargingProfile`, `ChargingProfileResponse`, `ActiveChargingProfileResult`, `ChargingProfileResult`, `ClearProfileResult`, `SetChargingProfile`, `CommandResult`, `CommandResponse`, `DisplayText`, `EnergyContract`, `LocationReferences`, `Token`, `AuthorizationInfo`, and `OCPIResponse`.
- Robust validation for OCPI-compliant data structures to ensure data integrity and accuracy.
- Compatible with a wide range of OCPI operations and functionalities, enhancing EV charging station services development.

## Installation

Install `node-ocpi` using npm:

```bash
npm install https://github.com/hyndex/node-ocpi
```

## Usage

Import the required models from `node-ocpi`:

```javascript
const {
    Location, EVSE, Connector, CDR, Command, Feedback, Meter, Reservation, Tariff, User, Transaction, Credentials,
    ChargingProfilePeriod, ChargingProfile, ActiveChargingProfile, ChargingProfileResponse, ActiveChargingProfileResult, ChargingProfileResult, ClearProfileResult, SetChargingProfile,
    CommandResult, CommandResponse,
    DisplayText, EnergyContract, LocationReferences, Token, AuthorizationInfo, OCPIResponse
} = require('node-ocpi');
```

### Model Usage Examples

#### Location Example

```javascript
const location = new Location({ /* Location data */ });
location.validate();
```

#### CommandResult Example

```javascript
const commandResult = new CommandResult({
    result: 'ACCEPTED',
    message: 'Command successfully executed'
});
commandResult.validate();
```

#### CommandResponse Example

```javascript
const commandResponse = new CommandResponse({
    result: 'REJECTED',
    timeout: 30,
    message: 'Command could not be executed'
});
commandResponse.validate();
```

#### OCPIResponse Example

```javascript
const ocpiResponse = new OCPIResponse({
    statusCode: 2000,
    statusMessage: 'Success',
    timestamp: new Date().toISOString(),
    data: { /* Your data object or array */ }
});
OCPIResponse.schema(YOUR_MODEL_SCHEMA).validate(ocpiResponse);
```

... (Continue with other models similarly)

## Integration with Express.js

Integrate `node-ocpi` in Express.js applications for efficient handling of OCPI data:

```javascript
const express = require('express');
const { Location } = require('node-ocpi');

const app = express();
app.use(express.json());

app.post('/locations', (req, res) => {
  try {
    const location = new Location(req.body);
    location.validate();
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a new feature branch.
3. Develop your feature or fix.
4. Write or adapt tests.
5. Update the documentation.
6. Commit and push your changes.
7. Submit a pull request.

## License

`node-ocpi` is released under the MIT License. See [LICENSE](LICENSE.md) for details.