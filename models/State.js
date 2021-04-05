const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
     
    id: Number,
    state: String,
    cities: Array
})

const State= mongoose.model('State',StateSchema);

module.exports = State;