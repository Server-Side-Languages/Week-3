const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, "Game name cannont be longer than 100 characters"],
        },
        release: {
            type: String,
            required: true,
            maxlength: [50, "Release Date must be less than 50 characters long"]
        },
        genre: {
            type: [String],
            required: true,
            enum: [
                "Role-Playing Game",
                "Action",
                "Adventure",
                "Simulation",
                "Horror",
                "Kids",
                "Fantasy",
                "Action-Adventure",
                "Other",
            ]
        },
        rating: {
            type: [String],
            required: true,
            enum: [
                "E for Everyone",
                "T for Teen",
                "E 10 and Up",
                "M for Mature"
            ]
        },
        developer:
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Developer",
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("Genre", genreSchema);