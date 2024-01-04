const controller = require("../controllers/planning_general.controller");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

module.exports = app => {
    const router = require("express").Router();

    router.get("/:idFestival", isLoggedIn, controller.getbyIdFestival);

    router.post("/", isLoggedIn, controller.createPlanning);

    router.put('/:PlanningId',controller.AddIdFestival)
    
    app.use("/planning_general", router);
    }