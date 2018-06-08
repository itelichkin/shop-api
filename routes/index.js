const database = new require('../database/database');

module.exports = function (app) {
    app.get('/objects', async function (req, res, next) {
        let objects;
        try {
            objects = await database.getAllObjects();
            res.send(objects)
        } catch (e) {
            next(e)
        }
    });


    app.get('/pizzas', async function (req, res, next) {
        let pizzas;
        try {
            pizzas = await database.pizzas.getPizzas();
            res.send(pizzas)
        } catch (e) {
            next(e)
        }
    });

    app.get('/pizza', async function (req, res, next) {
        const id = req.query.id;
        let object;
        try {
            object = await database.pizzas.getPizzaById(id);
            res.send(object)
        } catch (e) {
            next(e)
        }
    });

    app.post('/pizza', async function (req, res, next) {
        let object;
        try {
            object = await database.pizzas.editPizzaById(req.body);
            res.send({modify: !!object});
        } catch (e) {
            next(e)
        }
    });

    app.delete('/pizza', async function (req, res, next) {
        const id = req.query.id;
        let status;
        try {
            status = await database.pizzas.removePizza(id);
            res.send({removed: status});
        } catch (e) {
            next(e)
        }
    });

    app.post('/pizzas', async function (req, res, next) {
        let status;
        try {
            status = await database.pizzas.createPizza(req.body);
            res.send({saved: status});
        } catch (e) {
            next(e)
        }
    });

    app.get('/sweets', async function (req, res, next) {
        let sweets;
        try {
            sweets = await database.sweets.getSweets();
            res.send(sweets)
        } catch (e) {
            next(e)
        }
    });

    app.get('/sweet', async function (req, res, next) {
        const id = req.query.id;
        let object;
        try {
            object = await database.sweets.getSweetById(id);
            res.send(object)
        } catch (e) {
            next(e)
        }
    });

    app.post('/sweet', async function (req, res, next) {
        let object;
        try {
            object = await database.sweets.editSweetById(req.body);
            res.send({modify: !!object});
        } catch (e) {
            next(e)
        }
    });

    app.delete('/sweet', async function (req, res, next) {
        const id = req.query.id;
        let status;
        try {
            status = await database.sweets.removeSweet(id);
            res.send({removed: status});
        } catch (e) {
            next(e)
        }
    });

    app.post('/sweets', async function (req, res, next) {
        let status;
        try {
            status = await database.sweets.createSweet(req.body);
            res.send({saved: status});
        } catch (e) {
            next(e)
        }
    });



    app.get('/ice-creams', async function (req, res, next) {
        let iceCreams;
        try {
            iceCreams = await database.iceCreams.getIceCreams();
            res.send(iceCreams)
        } catch (e) {
            next(e)
        }
    });

    app.get('/ice-cream', async function (req, res, next) {
        const id = req.query.id;
        let object;
        try {
            object = await database.iceCreams.getIceCreamById(id);
            res.send(object)
        } catch (e) {
            next(e)
        }
    });

    app.post('/ice-cream', async function (req, res, next) {
        let object;
        try {
            object = await database.iceCreams.editIceCreamById(req.body);
            res.send({modify: !!object});
        } catch (e) {
            next(e)
        }
    });

    app.delete('/ice-cream', async function (req, res, next) {
        const id = req.query.id;
        let status;
        try {
            status = await database.iceCreams.removeIceCream(id);
            res.send({removed: status});
        } catch (e) {
            next(e)
        }
    });

    app.post('/ice-creams', async function (req, res, next) {
        let status;
        try {
            status = await database.iceCreams.createIceCream(req.body);
            res.send({saved: status});
        } catch (e) {
            next(e)
        }
    });


};