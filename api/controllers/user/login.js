const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  friendlyName: "Login",

  description: "Login user.",

  inputs: {
    email: {
      description: "Email of the user to look up.",
      type: "string",
      required: true,
      isEmail: true
    },
    password: {
      description: "Password of the user.",
      type: "string",
      required: true
    }
  },

  exits: {
    success: {
      token: "gerjgoiwewe"
    },
    invalid: {
      message: "Password incorrect",
      responseCode: 400
    }
  },

  fn: async function (inputs, exits) {
    const user = await User.findOne({
      email: inputs.email
    });
    sails.log(user);
    if (!user) {
      return exits.invalid({
        message: "Email incorrect"
      });
    }
    if (!bcrypt.compareSync(inputs.password, user.password)) {
      return exits.invalid({
        message: "Password incorrect"
      });
    }
    return exits.success({
      userID: user.id,
      email: user.email,
      token: jwt.sign({
        id: user.id
      }, (await sails.helpers.secrets()).jwt)
    });
  }
};
