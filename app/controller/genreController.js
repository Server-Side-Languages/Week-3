const Developers = require("../models/Developers");
const Genre = require("../models/Genre");

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({}).populate('developer', 'name');
        res.status(200).json({
            data: genres,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error fetching all genres", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getGenreById = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findById(id).populate('developer', 'name');
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            data: genre,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error fetching genre by ID", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const createGenre = async (req, res) => {
    try {
        const { genre } = req.body;
        console.log("Received genre data:", genre);

        const user = await Developers.findById(genre.developer);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.genres = user.genres || [];

        genre.developer = user._id;

        console.log("Genre data after developer assignment:", genre);

        let genreData = new Genre(genre);
        console.log("Created genre data:", genreData);

        user.genres.push(genreData._id);

        const queries = [genreData.save(), user.save()];
        await Promise.all(queries);

        genreData = await Genre.findById(genreData._id).populate('developer', 'name');
        console.log("Populated genre data:", genreData);

        res.status(200).json({
            success: true,
            data: genreData,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error creating genre:", error);
        if (error.name === "ValidationError") {
            return res.status(422).json(error);
        } else {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

const updateGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByIdAndUpdate(id, req.body, { new: true }).populate('developer', 'name');
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            data: genre,
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error updating genre", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByIdAndDelete(id);
        if (!genre) {
            return res.status(404).json({
                success: false,
                message: `Genre with id ${id} not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `${req.method} - request to Genre endpoint`,
        });
    } catch (error) {
        console.error("Error deleting genre", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
};