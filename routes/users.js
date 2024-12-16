const routes = require("express").Router();
const controller = require("../controllers/index");
const { isAuthenticated } = require("../middleware/authenticate")

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSingle);
routes.post("/", isAuthenticated, controller.createUser);
routes.put("/:id", isAuthenticated, controller.updateUser);
routes.delete("/:id", isAuthenticated, controller.deleteUser);

module.exports = routes;