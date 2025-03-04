const { Schema, default: mongoose } = require("mongoose");

const SectionSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["logical_reasoning", "reading_comprehension"],
      required: true,
    },
    description: { type: String, required: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    estimatedTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Section =
  mongoose.models.Section || mongoose.model("Section", SectionSchema);

export default Section;
