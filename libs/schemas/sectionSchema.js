import { z } from "zod";

export const SectionSchema = z.object({
  // name, description, type, estimatedTime
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  type: z.string().min(1, "type is required"),
  estimatedTime: z.number().gte(1, "estimatedTime must be greater than 0"),
  questions: z.array(z.string()).optional(),
});
