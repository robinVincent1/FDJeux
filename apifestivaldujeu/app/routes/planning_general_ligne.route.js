const controller = require("../controllers/planning_general_ligne.controller");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

module.exports = app => {
    const router = require("express").Router();

    router.get("/", isLoggedIn, controller.getAllLigne);

    router.post("/", isLoggedIn, controller.createLigne);

    router.put("/modifytitre/:id", controller.modifytitre);

    
    router.delete("/:id", controller.deleteById);
    
    app.use("/planning_general_ligne", router);
    }

    