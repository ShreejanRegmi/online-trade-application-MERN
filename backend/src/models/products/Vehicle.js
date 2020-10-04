const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    brand: {
        type: String,
        trim: true,
        required: true
    },
    kmDriven: {
        type: Number,
        required: true
    },
    mfgdYear: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    soldFrom: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true,
        lowercase: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        default: "vehicle"
    },
    datePosted: {
        type: Date,
        default: Date.now()
    },
    archived: {
        type: Boolean,
        default: false
    },
    userArchived: {
        type: Boolean,
        default: false
    },
    images: [String]
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;