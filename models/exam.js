const { Schema, default: mongoose } = require("mongoose");

const ExamSchema = new Schema({
  title: String,
  description: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  totalQuestions: Number,
  totalTime: Number,
  difficulty: String,
  tags: [String],
}, {
  timestamps: true,
});

const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema)

export default Exam;