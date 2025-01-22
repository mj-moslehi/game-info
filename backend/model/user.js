const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            validator.isAlpha(value, "en-US", { ignore: " " }) &&
            value.length >= 3
          );
        },
        message: (props) =>
          `${props.value} is not a valid name. It must be at least 3 characters long and contain only English letters and spaces.`,
      },
    },

    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            validator.isAlpha(value, "en-US", { ignore: " " }) &&
            value.length >= 3
          );
        },
        message: (props) =>
          `${props.value} is not a valid name. It must be at least 3 characters long and contain only English letters and spaces.`,
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return (
            validator.isAlphanumeric(value) &&
            value.length >= 5 &&
            /[A-Za-z]/.test(value) &&
            /\d/.test(value)
          );
        },
        message: (props) =>
          `${props.value} is not a valid username. It must be at least 5 characters long, contain only letters and numbers, and include at least one letter and one number.`,
      },
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[@$!%*?&]/.test(value)
          );
        },
        message: (props) =>
          `Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.`,
      },
    },

    dateOfSignUp: {
      type: Date,
      required: true,
      default: Date.now,
      immutable: true,
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    enable: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("User", userSchema);
