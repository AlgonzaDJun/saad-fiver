import { z } from "zod";

export const ExamSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  sections: z.array(z.string()).optional(),
  totalQuestions: z.number().gte(1, "totalQuestions must be greater than 0"),
  totalTime: z.number().gte(1, "totalTime must be greater than 0"),
  difficulty: z.string().min(3),
  tags: z.array(z.string()).optional(),
});