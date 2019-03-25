const jwt = require("jsonwebtoken");

module.exports = async function (req, _, next) {
  if (req.get("authorization")) {
    if (req.get("authorization").toLowerCase().startsWith("bearer ")) {
      const token = req.get("authorization").split(" ")[1];
      try {
        const content = jwt.verify(token, (await sails.helpers.secrets()).jwt);
        try {
          const user = await User.findOne({
            id: content.id
          });
          req.me = user;
        } catch (err) {
          sails.log.silly("error finding user " + err.message);
        }
      } catch (err) {
        sails.log.silly("error deserializing token " + err.message);
      }
    } else {
      sails.log.silly('authorization header must start with "bearer "');
    }
  } else {
    sails.log.silly("no authorization header sent");
  }
  next();
};
