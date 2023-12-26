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

const {
    ChargingProfilePeriod,
    ChargingProfile,
    ActiveChargingProfile,
    ChargingProfileResponse,
    ActiveChargingProfileResult,
    ChargingProfileResult,
    ClearProfileResult,
    SetChargingProfile
} = require('./src/models/ChargingProfile');

const { CommandResult, CommandResponse } = require('./src/models/CommandResult');

const { DisplayText, roleEnum } = require('./src/models/DisplayText');

const {
    EnergyContract,
    LocationReferences,
    Token,
    AuthorizationInfo
} = require('./src/models/Token');

const OCPIResponse = require('./src/models/OCPIResponse');

module.exports = {
    Location,
    EVSE,
    Connector,
    CDR,
    Command,
    Feedback,
    Meter,
    Reservation,
    Tariff,
    User,
    Transaction,
    Credentials,
    ChargingProfilePeriod,
    ChargingProfile,
    ActiveChargingProfile,
    ChargingProfileResponse,
    ActiveChargingProfileResult,
    ChargingProfileResult,
    ClearProfileResult,
    SetChargingProfile,
    CommandResult,
    CommandResponse,
    DisplayText,
    EnergyContract,
    LocationReferences,
    Token,
    AuthorizationInfo,
    OCPIResponse,
};
