import connectDB from "@/libs/db";
import Exam from "@/models/exam";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import { z } from "zod";

const ExamSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  sections: z.array(z.string()).optional(),
  totalQuestions: z.number().gte(1, "totalQuestions must be greater than 0"),
  totalTime: z.number().gte(1, "totalTime must be greater than 0"),
  difficulty: z.string().min(3),
  tags: z.array(z.string()).optional(),
});

export const GET = async () => {
  await connectDB();
  const data = await Exam.find().sort({
    createdAt: -1,
  });

  return NextResponse.json({
    data,
    success: true,
    message: "Success get data",
  });
};

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const validatedData = ExamSchema.safeParse(body);

    if (!validatedData.success) {
      return handleError(
        {
          message: "Validation failed",
          errors: validatedData.error.errors[0], // Detail error validasi
        },
        400
      );
    }

    await Exam.create(validatedData.data);

    return NextResponse.json(
      {
        message: "Success",
        data: validatedData,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
