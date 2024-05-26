const router = require("express").Router();
const {
    createDeveloper,
    getAllDevelopers,
    getDeveloperById,
    updateDeveloper,
    deleteDeveloper,
} = require("../controller/developerController")

router.get("/", getAllDevelopers);

router.get("/:id", getDeveloperById);

router.post("/", createDeveloper);

router.put("/:id", updateDeveloper);

router.delete("/:id", deleteDeveloper);

module.exports = router;
