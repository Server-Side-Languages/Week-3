const Developers = require("../models/Developers");

const getAllDevelopers = async (req, res) => {

    let queryString = JSON.stringify(req.query);

    queryString = queryString.replace(
        /\b(gt|gte|lt|lte)\b/g
        ,match => `$${match}`);
        let query = Developers.find(JSON.parse(queryString));

        if(req.query.select){
            const fields = req.query.select.split(',').join(" ");
            query = Developers.find({}).select(fields);
        }

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(" ");
            query = Developers.find({}).sort(sortBy);
        }

        query = Developers.find({});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        query.skip(skip).limit(limit);

    try {
        const developers = await query;
        res.status(200).json({
            data: developers,
            success: true,
            message: `${req.method} - request to Developer endpoint`,
        });
    } catch (error) {
        console.error("Error fetching all developers", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getDeveloperById = async (req, res) => {
    const { id } = req.params;
    try {
        const developer = await Developers.findById(id);
        if (!developer) {
            return res.status(404).json({
                success: false,
                message: `Developer with id ${id} not found`
            });
        }
        res.status(200).json({
            data: developer,
            success: true,
            message: `${req.method} - request to Developer endpoint`,
        });
    } catch (error) {
        console.error("Error fetching developer by ID", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const createDeveloper = async (req, res) => {
    const { developer } = req.body;
    try{
        const newDeveloper = await Developers.create(developer);
        console.log("data >>>", newDeveloper)
        res.status(200).json({
            success:true,
            message: `${req.method} - request to Developer endpoint`,
        });
    }catch(error){
        if (error.name == "ValidationError") {
            console.error("Error Validating!", error);
            res.status(422).json(error);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const updateDeveloper = async (req, res) => {
    const { id } = req.params;
    try {
        const developer = await Developers.findByIdAndUpdate(id, req.body, { new: true });
        if (!developer) {
            return res.status(404).json({
                success: false,
                message: `Developer with id ${id} not found`,
            });
        }
        res.status(200).json({
            data: developer,
            success: true,
            message: `${req.method} - request to Developer endpoint`,
        });
    } catch (error) {
        console.error("Error updating developer", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteDeveloper = async (req, res) => {
    const { id } = req.params;
    try {
        const developer = await Developers.findByIdAndDelete(id);
        if (!developer) {
            return res.status(404).json({
                success: false,
                message: `Developer with id ${id} not found`
            });
        }
        res.status(200).json({
            success: true,
            message: `${req.method} - request to Developer endpoint`,
        });
    } catch (error) {
        console.error("Error deleting developer", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createDeveloper,
    getAllDevelopers,
    getDeveloperById,
    updateDeveloper,
    deleteDeveloper,
}