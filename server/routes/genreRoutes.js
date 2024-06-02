const router = require("express").Router();
const {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
} = require("../controller/genreController")

router.get("/", getAllGenres);

router.get("/:id", getGenreById);

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", deleteGenre);
module.exports = router;
