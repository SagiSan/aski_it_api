module.exports = {
  friendlyName: "Like",

  description: "Like/dislike question.",

  inputs: {
    // id is defined in route
    id: {
      type: "string",
      required: true
    },
    shouldLike: {
      type: "bool",
      required: true
    },
    answerOrQuestion: {
      type: "string",
      required: true,
      isIn: ["answer", "question"]
    }
  },

  exits: {
    success: {},
    questionNotFound: {
      responseType: "notFound"
    },
    alreadyLiked: {
      responseType: "badRequest"
    }
  },

  fn: async function (inputs, exits) {
    console.log(inputs.answerOrQuestion);
    const likeOrDislike = inputs.shouldLike ? 'likedBy' : 'dislikedBy';
    const QuestionOrAnswerModel = (inputs.answerOrQuestion == 'question') ? Question : Answer;
    const question = await QuestionOrAnswerModel.findOne(inputs.id).populate(likeOrDislike);
    if (!question) {
      return exits.questionNotFound();
    }

    console.log(question[likeOrDislike]);
    console.log(this.req.me.id);
    for (let userInArray of question[likeOrDislike]) {
      if (userInArray.id == this.req.me.id) {
        return exits.alreadyLiked();
      }
    }

    await QuestionOrAnswerModel.addToCollection(inputs.id, likeOrDislike, this.req.me.id);

    return exits.success(question[likeOrDislike].length + 1);
  }
};
