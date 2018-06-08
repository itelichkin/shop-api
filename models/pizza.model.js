const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const pizzaDataSchema = new Schema({
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

exports.PizzaDataSchema = mongoose.model('PizzaDataSchema', pizzaDataSchema);