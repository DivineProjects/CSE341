const routes = require("express").Router();
const controllers = require("../controllers/index");

routes.get('/', controllers.homeRouter
);


module.exports = routes;