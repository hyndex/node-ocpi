const Location = require('./src/models/Location');
const EVSE = require('./src/models/EVSE');
const Connector = require('./src/models/Connector');
const CDR = require('./src/models/CDR');
const Command = require('./src/models/Command');
const Feedback = require('./src/models/Feedback');
const Meter = require('./src/models/Meter');
const Reservation = require('./src/models/Reservation');
const Tariff = require('./src/models/Tariff');
const User = require('./src/models/User');
const Transaction = require('./src/models/Transaction');
const Credentials = require('./src/models/Credentials');

module.exports = { Location, EVSE, Connector, CDR, Connector, Command, Feedback, Meter, Reservation, Tariff, Transaction, User, Credentials };
