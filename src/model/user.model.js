const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    userPhone: {
        type: String,
    },
    userAddress: {
        type: String,
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;