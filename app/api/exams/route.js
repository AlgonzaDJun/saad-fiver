import connectDB from "@/libs/db";
import { ExamSchema } from "@/libs/schemas/examSchema";
import Exam from "@/models/exam";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Izinkan semua origin (bisa diganti ke domain spesifik)
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export const GET = async () => {
  await connectDB();
  const data = await Exam.find().populate("sections").sort({
    createdAt: -1,
  }).exec();

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
          errors: validatedData.error.errors, // Detail error validasi
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
