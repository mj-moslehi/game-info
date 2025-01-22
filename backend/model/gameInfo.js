const mongoose = require("mongoose");
const validator = require("validator");

const GameInfoSchema = mongoose.Schema(
    {
        gameName: {
            type: String,
            index: true,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Game name cannot be empty or just spaces",
            },
        },

        genre: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Genre cannot be empty or just spaces",
            },
        },

        type: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Type cannot be empty or just spaces",
            },
        },

        summary: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "summary cannot be empty or just spaces",
            },
        },

        about: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "about free cannot be empty or just spaces",
            },
        },

        organization: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Organization free cannot be empty or just spaces",
            },
        },

        developerStudio: {
            type: String,
            required:true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Developer Studio cannot be empty or just spaces",
            },
        },

        publisher: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Publisher cannot be empty or just spaces",
            },
        },

        characters: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Characters cannot be empty or just spaces",
            },
        },

        locations: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Locations cannot be empty or just spaces",
            },
        },

        awards: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Awards cannot be empty or just spaces",
            },
        },

        events: {
            type: String,
            required: [true, "Events are required"],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Events cannot be empty or just spaces",
            },
        },

        platform: {
            type: String,
            required: [true, "Movies are required"],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Platform cannot be empty or just spaces",
            },
        },

        media: {
            type: String,
            required: [true, "Books are required"],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Media cannot be empty or just spaces",
            },
        },

        books: {
            type: String,
            required: [true, "Books are required"],
            validate: {
                validator: function (value) {
                    return !validator.isEmpty(value.trim());
                },
                message: "Books cannot be empty or just spaces",
            },
        },

        deleted: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GameInfo", GameInfoSchema);
