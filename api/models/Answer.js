//question module

module.exports = {
  attributes: {
    text: { type: "string", required: true },
    creator: { model: "user", required: true },
    question: { model: "question", required: true },
    likedBy: { collection: "user", via: "answerLikes" },
    dislikedBy: { collection: "user", via: "answerDislikes" }
  }
};
