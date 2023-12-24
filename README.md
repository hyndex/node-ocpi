# node-ocpi Library Documentation

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
const location = new Location('loc1', 'ON_STREET', 'Main Street Charging Station', '123 Main St', 'Anytown', '12345', 'USA', { latitude: 52.520008, longitude: 13.404954 });
location.validate();
```

#### EVSE

```javascript
const evse = new EVSE('evse1', 'loc1', 'AVAILABLE', ['CHADEMO']);
evse.validate();
```

#### Connector

```javascript
const connector = new Connector('1', 'IEC_62196_T2', 'CABLE', 'AC_3_PHASE', 400, 16, 0);
connector.validate();
```

#### CDR

```javascript
const cdr = new CDR('cdr1', new Date(), new Date(), 'session1', 'token1', 'authMethod1', { id: 'loc1', address: '123 Main St' }, 'evse1', '1', 'meter1', 'EUR', 15.00);
cdr.validate();
```

#### Command

```javascript
const command = new Command('cmd1', 'START_TRANSACTION', { connectorId: '1', idTag: 'tag1' });
command.validate();
```

#### Transaction

```javascript
const transaction = new Transaction('txn1', 'tag1', new Date(), 100, 'loc1', 'evse1', '1');
transaction.validate();
```

#### Feedback

```javascript
const feedback = new Feedback('feedback1', 'user1', 'Great charging station!', 5);
feedback.validate();
```

#### Meter

```javascript
const meter = new Meter('meter1', 500, new Date());
meter.validate();
```

#### Reservation

```javascript
const reservation = new Reservation('res1', new Date(), new Date(), 'loc1', 'evse1', 'tag1');
reservation.validate();
```

#### Tariff

```javascript
const tariff = new Tariff('tariff1', 'EUR', [{ type: 'TIME', price: 2.00 }]);
tariff.validate();
```

#### User

```javascript
const user = new User('user1', 'John Doe', 'john.doe@example.com', true);
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

