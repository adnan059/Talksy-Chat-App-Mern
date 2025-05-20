const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Email_Pattern, Password_Pattern } = require("../lib/utils");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
      minlength: [2, "must not be less than 2 characters"],
      maxlength: [20, "must not be more than 20 characters"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: {
        validator: function (v) {
          const regex = new RegExp(Email_Pattern);

          return regex.test(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },

    password: {
      type: String,
      required: [true, "password is required"],

      validate: {
        validator: function (v) {
          const regex = new RegExp(Password_Pattern);

          return regex.test(v);
        },
        message: (props) =>
          `Min 8 Chars: upperCase, lowerCase, number/special Char needed`,
      },
    },

    profilePic: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message: "another user with the same {PATH} already exists.",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
