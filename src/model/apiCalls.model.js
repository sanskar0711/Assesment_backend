const mongoose = require('mongoose');

const apiCallsSchema = new mongoose.Schema({
    addAPICalls: {
        type: Number,
        default: 0,
    },
    updateAPICalls: {
        type: Number,
        default: 0,
    },
});

const ApiCallsModel = mongoose.model('ApiCalls', apiCallsSchema);

module.exports = ApiCallsModel;