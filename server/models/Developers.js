const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a Developer"],
        unique: [true, "You can only have one Developer"],
        trim: true,
        maxlength: [50, "Your name is too long"],
    },
    age: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: [true, "Please add the company they work for"],
        maxlength: [100, "Company name can not be longer than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Describe the type of game(s) they have made"],
        maxlength: [500, "Description can be no longer than 500 characters"]
    },
    genre:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
    },
})

module.exports = mongoose.model('Developer', developerSchema);