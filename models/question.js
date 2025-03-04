const { Schema, default: mongoose } = require("mongoose");

const QuestionSchema = new Schema(
  {
    questionContent: { type: String, required: true },
    questionType: { type: String, required: true },
    questionSubType: { type: String, required: true },
    choices: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    severity: { type: String, required: true },
    sequenceNumber: { type: Number, required: true },
    answerNote: { type: String, required: true },
    tags: [String],
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    passage: { type: mongoose.Schema.Types.ObjectId, ref: "Passage" },
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export default Question;
