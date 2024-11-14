const routes = require("express").Router();
const controllers = require("../controllers/index");

routes.get('/', controllers.homeRouter);

routes.get("/users", controllers.getAll);
routes.get("/users/:id", controllers.getSingle);


module.exports = routes;