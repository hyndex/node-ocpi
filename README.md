# node-ocpi

A Node.js library for handling Open Charge Point Interface (OCPI) data structures, including `Location`, `EVSE`, `Connector`, and `CDR` (Charge Detail Record) classes. This library helps in creating OCPI-compliant charging station management applications by providing structured data models and validation.

## Features

- Models for key OCPI entities: `Location`, `EVSE`, `Connector`, `CDR`.
- Data validation for OCPI-compliant structure and format.
- Easy integration into Node.js projects.

## Installation

To install the `node-ocpi` library, use npm:

```bash
npm install https://github.com/hyndex/node-ocpi
```

## Usage

Here's how to use the `node-ocpi` library in your project:

### Importing the Library

```javascript
const { Location, EVSE, Connector, CDR } = require('node-ocpi');
```

### Creating and Using an OCPI Object

#### Location

```javascript
const location = new Location(/* parameters */);
// Validate location data
location.validate();
```

#### EVSE

```javascript
const evse = new EVSE(/* parameters */);
// Validate EVSE data
evse.validate();
```

#### Connector

```javascript
const connector = new Connector(/* parameters */);
// Validate connector data
connector.validate();
```

#### CDR

```javascript
const cdr = new CDR(/* parameters */);
// Validate CDR data
cdr.validate();
```

## API Reference

### Location Class

- Constructor parameters: `id`, `type`, `name`, `address`, `city`, `postalCode`, `country`, `coordinates`, `relatedLocations`, `parkingType`, `evse`, `facilities`, `time_zone`, `opening_times`, `charging_when_closed`, `images`, `energy_mix`, `business_details`, `operator`, `suboperator`, `owner`, `clearinghouse`.
- Methods: `validate()`.

### EVSE Class

- Constructor parameters: `uid`, `evse_id`, `status`, `capabilities`, `connectors`, `floor_level`, `coordinates`, `physical_reference`, `directions`, `parking_restrictions`, `images`, `charging_when_closed`, `last_updated`, `energy_mix`, `accessibility`, `related_evses`, `group_id`, `pricing_policy`, `realtime_data`.
- Methods: `validate()`.

### Connector Class

- Constructor parameters: `id`, `standard`, `format`, `powerType`, `maxVoltage`, `maxAmperage`, `maxElectricPower`, `voltage`, `amperage`, `tariff_id`, `last_updated`, `terms_and_conditions`, `phase_to_phase_voltage`, `phase`, `pricing`, `parking_spot`, `accessibility`, `authentication_modes`, `identification_restrictions`, `payment_methods`, `supported_energy_mix`.
- Methods: `validate()`.

### CDR Class

- Constructor parameters: `id`, `startDateTime`, `endDateTime`, `authId`, `authMethod`, `location`, `evseId`, `connectorId`, `meterId`, `currency`, `totalCost`, `chargingPeriods`, `totalEnergy`, `totalTime`, `lastUpdated`, `stopReason`, `totalParkingTime`, `totalReservationCost`, `remark`, `signedData`, `relatedCDRs`, `locationReference`, `productData`, `chargingPreferences`, `environmentalImpact`.
- Methods: `validate()`.

## Contributing

Contributions to `node-ocpi` are welcome! Please refer to the contributing guidelines for details on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
