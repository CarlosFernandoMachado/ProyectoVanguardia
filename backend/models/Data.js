const { Schema, model } = require('mongoose');

const DataSchema = new Schema({
    distance: { type: String, required: true },
    sensor: { type: String, required: true},
    date_created: { type: Date, default: Date.now}
})

module.exports = model('Data', DataSchema);