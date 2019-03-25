module.exports = {
  friendlyName: "All secrets of my project",

  description: "",

  inputs: {},

  exits: {
    success: {
      jwt: "herfijweio",
      passwords: "vsiofe"
    }
  },

  fn: async function(inputs, exits) {
    return exits.success({
      jwt: "gerjfioejffajeifoe",
      passwords: 12
    });
  }
};
