const mongoose = require("mongoose");

const DemoSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    qty: Array,
    equipment: Array,
    address: [{
        streetAddress: Number,
        city: String,
        state: String,
        postalCode: Number
    }],
    phoneNumbers: [{
        ContactType: String,
        mobile: Number
    }]
})

const Demo = mongoose.model('Demo',DemoSchema);

module.exports = Demo;