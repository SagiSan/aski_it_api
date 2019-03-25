//question module

module.exports = {
  attributes: {
    text: { type: "string", required: true },
    creator: { model: "user", required: true },
    answers: { collection: "answer", via: "question" },
    likedBy: { collection: "user", via: "questionLikes" },
    dislikedBy: { collection: "user", via: "questionDislikes" }
  }
};
