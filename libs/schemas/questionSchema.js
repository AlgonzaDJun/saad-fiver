import { z } from "zod";

export const QuestionSchema = z.object({
  questionContent: z.string().min(1, "questionContent is required"),
  questionType: z.string().min(1, "questionType is required"),
  questionSubType: z.string().min(1, "questionSubType is required"),
  choices: z.array(
    z.object({
      text: z.string().min(1, "text is required"),
      isCorrect: z.boolean().optional(),
    })
  ),
  severity: z.string().min(1, "severity is required"),
  sequenceNumber: z.number().gte(1, "sequenceNumber must be greater than 0"),
  answerNote: z.string().min(1, "answerNote is required"),
  tags: z.array(z.string()).optional(),
  passage: z.string().nullable().optional(),
  section: z.string().nullable().optional(),
});
