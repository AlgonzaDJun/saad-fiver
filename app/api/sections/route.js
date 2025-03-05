import connectDB from "@/libs/db";
import { SectionSchema } from "@/libs/schemas/sectionSchema";
import Exam from "@/models/exam";
import Section from "@/models/section";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const data = await Section.find()
    .populate("passages")
    .populate("questions")
    .sort({
      createdAt: -1,
    })
    .exec();

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

    const validatedData = SectionSchema.safeParse(body);

    if (!validatedData.success) {
      return handleError(
        {
          message: "Validation failed",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const section = await Section.create(validatedData.data);

    await Exam.updateOne(
      {
        _id: validatedData.data.exam,
      },
      {
        $push: {
          sections: section._id,
        },
      }
    );

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
        status: 500,
      }
    );
  }
};
