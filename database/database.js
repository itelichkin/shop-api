const mongoose = require('../lib/mongoose');
const async = new require('async');
require('../models/pizza.model');
require('../models/sweets.model');
require('../models/ice-cream.model');

const Schema = mongoose.Schema;

const PizzaDataSchema = mongoose.models.PizzaDataSchema;
const SweetsDataSchema = mongoose.models.SweetsDataSchema;
const IceCreamDataSchema = mongoose.models.IceCreamDataSchema;


const pizzaSchema = new Schema();
const sweetsSchema = new Schema();
const iceCreamSchema = new Schema();
const shopSchema = new Schema();

async.series([
    open,
    checkPizzas,
    checkSweets,
    checkIceCreams
], function (err) {
    if (err) {
        return new Error(err)
    }
    console.log('INIT')
});

function open(callback) {
    mongoose.connection.on('open', function (err) {
        if (err) {
            return new Error(err)
        }
        callback(null, 'open')
    });
}

function checkPizzas(mainCallback) {
    // await PizzaDataSchema.remove({})
    async.waterfall([
        function (callback) {
            PizzaDataSchema.find({}, function (error, res) {
                if (error) {
                    return new Error(error)
                }
                callback(null, res);
            });
        },
        function (pizzas, callback) {
            if (!pizzas || pizzas.length === 0) {
                async.each(defaultPizzasData, function (pizzasData, callback) {
                    const pizza = new mongoose.models.PizzaDataSchema(pizzasData);
                    pizza.save();
                });
            }
            callback(null, 'done');
        },
    ], function (err, result) {
        if (err) {
            return new Error(err)
        }
        mainCallback(null, 'pizza')
    });
}

function checkSweets(mainCallback) {
    /* await SweetsDataSchema.remove()*/
    async.waterfall([
        function (callback) {
            SweetsDataSchema.find({}, function (error, res) {
                if (error) {
                    return new Error(error)
                }
                callback(null, res);
            });
        },
        function (sweets, callback) {
            if (!sweets || sweets.length === 0) {
                async.each(defaultSweetsData, function (sweetsData, callback) {
                    const sweet = new mongoose.models.SweetsDataSchema(sweetsData);
                    sweet.save();
                });
            }
            callback(null, 'done')
        }
    ], function (err, result) {
        if (err) {
            return new Error(err)
        }
        mainCallback(null, 'sweet')
    });
}

function checkIceCreams (mainCallback) {
    /* await IceCreamDataSchema.remove()*/
    async.waterfall([
        function (callback) {
            IceCreamDataSchema.find({}, function (error, res) {
                if (error) {
                    return new Error(error)
                }
                callback(null, res);
            });
        },
        function (iceCreams, callback) {
            if (!iceCreams || iceCreams.length === 0) {
                async.each(defaultIceCreamsData, function (iceCreamsData, callback) {
                    const iceCream = new mongoose.models.IceCreamDataSchema(iceCreamsData);
                    iceCream.save();
                });
            }
            callback(null, 'done')
        }
    ], function (err, result) {
        if (err) {
            return new Error(err)
        }
        mainCallback(null, 'iceCream')
    });
}

pizzaSchema.statics.getPizzas = function () {
    return new Promise((resolve, reject) => {
        PizzaDataSchema.find({}, function (err, res) {
            if (err) {
                return new Error(err)
            }
            let pizzas = [];
            if (res) {
                res.forEach((_pizza) => {
                    const pizza = generatePizzaData(_pizza);
                    pizzas.push(pizza);
                });
            }
            resolve(pizzas);
        });
    });
};

pizzaSchema.statics.removePizza = async function (id) {
    return new Promise(async (resolve, reject) => {
        PizzaDataSchema.findOne({_id: id}, function (err, pizza) {
            if (err) {
                return new Error(err)
            } else {
                if (pizza) {
                    pizza.remove();
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

pizzaSchema.statics.createPizza = async function (data) {
    return new Promise(async (resolve, reject) => {
        const pizza = new mongoose.models.PizzaDataSchema(data);
        pizza.save();
        resolve(true);
    });
};


function generatePizzaData(pizza) {
    return {
        id: pizza._id,
        name: pizza.name,
        price: pizza.price,
        image: pizza.image
    }
}

sweetsSchema.statics.getSweets = function () {
    return new Promise((resolve, reject) => {
        SweetsDataSchema.find({}, function (err, res) {
            if (err) {
                return new Error(err)
            }
            let sweets = [];
            if (res) {
                res.forEach((_sweet) => {
                    const sweet = generateSweetsData(_sweet);
                    sweets.push(sweet);
                });
            }
            resolve(sweets);
        });
    });
};

sweetsSchema.statics.removeSweet = async function (id) {
    return new Promise(async (resolve, reject) => {
        SweetsDataSchema.findOne({_id: id}, function (err, sweet) {
            if (err) {
                return new Error(err)
            } else {
                if (sweet) {
                    sweet.remove(function () {
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            }
        });
    });
};

sweetsSchema.statics.createSweet = async function (data) {
    return new Promise(async (resolve, reject) => {
        const sweet = new mongoose.models.SweetsDataSchema(data);
        await sweet.save();
        resolve(true);
    });
};

function generateSweetsData(sweet) {
    return {
        id: sweet._id,
        name: sweet.name,
        price: sweet.price,
        image: sweet.image
    }
}

iceCreamSchema.statics.getIceCreams = function () {
    return new Promise((resolve, reject) => {
        IceCreamDataSchema.find({}, function (err, res) {
            if (err) {
                return new Error(err)
            }
            let iceCreams = [];
            if (res) {
                res.forEach((_iceCream) => {
                    const iceCream = generateSweetsData(_iceCream);
                    iceCreams.push(iceCream);
                });
            }
            resolve(iceCreams);
        });
    });
};

iceCreamSchema.statics.removeIceCream = async function (id) {
    return new Promise(async (resolve, reject) => {
        IceCreamDataSchema.findOne({_id: id}, function (err, iceCream) {
            if (err) {
                return new Error(err)
            } else {
                if (iceCream) {
                    iceCream.remove(function () {
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            }
        });
    });
};

iceCreamSchema.statics.createIceCream = async function (data) {
    return new Promise(async (resolve, reject) => {
        const iceCream = new mongoose.models.IceCreamDataSchema(data);
        await iceCream.save();
        resolve(true);
    });
};

function generateIceCreamData(iceCream) {
    return {
        id: iceCream._id,
        name: iceCream.name,
        price: iceCream.price,
        image: iceCream.image
    }
}

const Pizzas = mongoose.model('Pizzas', pizzaSchema);
const Sweets = mongoose.model('Sweets', sweetsSchema);
const IceCream = mongoose.model('IceCream', iceCreamSchema);


const defaultPizzasData = [
    {name: 'Domino', price: '70 UAH', image: 'domino'},
    {name: 'Amigo', price: '50 UAH', image: 'amigo'},
    {name: 'Deluxe', price: '100 UAH', image: 'deluxe'},
    {name: 'Meat', price: '150 UAH', image: 'meat'}
];
const defaultSweetsData = [
    {name: 'Cheesecake', price: '50 UAH', image: 'cheesecake'},
    {name: 'Cake', price: '50 UAH', image: 'cake'},
    {name: 'Pudding', price: '100 UAH', image: 'pudding'},
    {name: 'Souffle', price: '150 UAH', image: 'souffle'}
];

const defaultIceCreamsData = [
    {name: 'Mix', price: '150 UAH', image: 'mix'},
    {name: 'Banana', price: '50 UAH', image: 'banana'},
    {name: 'Apple', price: '50 UAH', image: 'apple'},
    {name: 'Orange', price: '50 UAH', image: 'orange'}
];



const mainDBSchema = new Schema({
    pizzas: Object,
    sweets: Object,
    iceCreams: Object
});

mainDBSchema.methods.getAllObjects = async function () {
    const pizzas = await Pizzas.getPizzas();
    const sweets = await Sweets.getSweets();
    const iceCreams = await IceCream.getIceCreams();

    return pizzas.concat(sweets, iceCreams);
};

MainDataBaseModel = mongoose.model('MainDataBaseModel', mainDBSchema);

const DataBase = new MainDataBaseModel({
    pizzas: Pizzas,
    sweets: Sweets,
    iceCreams: IceCream
});

module.exports = DataBase;
