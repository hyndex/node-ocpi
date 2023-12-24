# node-ocpi Library

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Made with Love](https://img.shields.io/badge/made%20with-love-ff69b4)
![Electric Vehicle](https://img.shields.io/badge/electric-vehicle-blue)
![Eco Friendly](https://img.shields.io/badge/eco-friendly-green)
![Tree](https://img.shields.io/badge/tree-%F0%9F%8C%B3-green)


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

Below are examples showing how to create instances of each model and perform data validation:

#### Location

```javascript
const location = new Location('loc1', 'ON_STREET', 'Main Street Charging Station', '123 Main St', 'Anytown', '12345', 'USA', { latitude: 52.520008, longitude: 13.404954  });
location.validate();
```

#### EVSE

```javascript
const evse = new EVSE('evse1', 'loc1', 'AVAILABLE', ['CHADEMO'], ['capability1'], '1', { latitude: 52.520008, longitude: 13.404954 }, 'Floor1', new Date().toISOString(), 'energy_mix');
evse.validate();
```

#### Connector

```javascript
const connector = new Connector('1', 'IEC_62196_T2', 'CABLE', 'AC_3_PHASE', 400, 16, 22, new Date().toISOString());
connector.validate();
```

#### CDR

```javascript
const cdr = new CDR('cdr1', new Date().toISOString(), new Date().toISOString(), 'token1', 'WHITELIST', location, 'evse1', '1', 'meter1', 'EUR', 15.00, [], 20, 2, new Date().toISOString());
cdr.validate();
```

#### Command

```javascript
const command = new Command('cmd1', 'START_TRANSACTION', { connectorId: '1', idTag: 'tag1'  });
command.validate();
```

#### Transaction

```javascript
const transaction = new Transaction('txn1', 'PAYMENT_CARD', 20, new Date().toISOString());
transaction.validate();
```

#### Feedback

```javascript
const feedback = new Feedback('feedback1', 'user1', 'Great charging station!', 5, new Date().toISOString());
feedback.validate();
```

#### Meter

```javascript
const meter = new Meter('meter1', [{ type: 'ENERGY', value: 500 }], new Date().toISOString());
meter.validate();
```

#### Reservation

```javascript
const reservation = new Reservation('res1', new Date().toISOString(), new Date().toISOString(), 'loc1', 'evse1', { id: 'user1', name: 'John Doe'  });
reservation.validate();
```

#### Tariff

```javascript
const tariff = new Tariff('tariff1', [{ type: 'TIME', price: 2.00, step_size: 300 }]);
tariff.validate();
```

#### User

```javascript
const user = new User('user1', 'John Doe', 'john.doe@example.com');
user.validate();
```

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

