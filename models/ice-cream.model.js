const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const iceCreamDataSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: String,
    image: String,
    type: String
});

exports.IceCreamDataSchema = mongoose.model('IceCreamDataSchema', iceCreamDataSchema);