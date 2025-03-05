import { z } from "zod";

export const PassageSchema = z.object({
    title: z.string().min(1, "title is required"),
    text: z.string().min(1, "text is required"),
    section: z.string().min(1, "section is required"),
    questions: z.array(z.string()).optional(),
    difficulty: z.string().min(3).optional(),
    tags: z.array(z.string()).optional(),
})