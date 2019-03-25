//user module

const bcrypt = require("bcrypt");

module.exports = {
  attributes: {
    email: { type: "string", unique: true, required: true, isEmail: true },
    password: { type: "string", required: true },
    answers: { collection: "answer", via: "creator" },
    questions: { collection: "question", via: "creator" },
    answerLikes: { collection: "answer", via: "likedBy" },
    answerDislikes: { collection: "answer", via: "dislikedBy" },
    questionLikes: { collection: "question", via: "likedBy" },
    questionDislikes: { collection: "question", via: "dislikedBy" }
  },

  beforeCreate: async function(valuesToSet, proceed) {
    valuesToSet.password = bcrypt.hashSync(
      valuesToSet.password,
      (await sails.helpers.secrets()).passwords
    );
    proceed();
  }
};
