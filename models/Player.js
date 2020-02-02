const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    primaryPosition: { type: String, required: true },
    secondaryPosition: { type: String },
    potential: { type: String, required: true },
    overall: { type: Number, required: true },
    progression: [{
        year: { type: Number, required: true },
        potential: { type: String, required: true },
        overall: { type: Number, required: true },
        class: { type: String, required: true }
    }]
});

module.exports = Player = mongoose.model('player', PlayerSchema);