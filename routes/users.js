const routes = require("express").Router();
const controller = require("../controllers/index");
const { isAuthenticated } = require("../middleware/authenticate")
const {userValidationRules,validate} = require("../middleware/validation")

routes.get("/", controller.getAll);
routes.get("/:id", controller.getSingle);
routes.post("/", isAuthenticated, userValidationRules(), validate, controller.createUser);
routes.put("/:id", isAuthenticated, userValidationRules(), validate, controller.updateUser);
routes.delete("/:id", isAuthenticated, controller.deleteUser);

module.exports = routes;