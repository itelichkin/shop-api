const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const sweetsDataSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: String,
    image: String
});

exports.SweetsDataSchema = mongoose.model('SweetsDataSchema', sweetsDataSchema);