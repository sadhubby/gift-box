const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    greeting:{
        type: String,
        required: true
    },
    gift:{
        type: String,
        required: true
    }
});

const Gifts = mongoose.model('Gifts', giftSchema);

module.exports = Gifts;