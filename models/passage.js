// import Question from "./question";
// import Section from "./section";

const { Schema, default: mongoose } = require("mongoose");

const PassageSchema = new Schema(
  {
    // title, text, questions foreign key, difficulty, tags
    title: { type: String, required: true },
    text: { type: String, required: true },
    section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    difficulty: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Passage =
  mongoose.models.Passage || mongoose.model("Passage", PassageSchema);

export default Passage;
