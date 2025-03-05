import connectDB from "@/libs/db";
import { PassageSchema } from "@/libs/schemas/passageSchema";
import Passage from "@/models/passage";
import Section from "@/models/section";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await Passage.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      data,
      success: true,
      message: "Success get data",
    });
  } catch (error) {
    return handleError(
      {
        message: error.message,
      },
      400
    );
  }
};

export const POST = async (request) => {
  const body = await request.json();

  try {
    await connectDB();
    const validatedData = PassageSchema.safeParse(body);

    if (!validatedData.success) {
      return handleError(
        {
          message: "Validation failed",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const passage = await Passage.create(validatedData.data);

    // add passage to section
    await Section.updateOne(
      {
        _id: passage.section,
      },
      {
        $push: {
          passages: passage._id,
        },
      }
    );

    return NextResponse.json({
      data: passage,
      success: true,
      message: "Success create data",
    });
  } catch (error) {
    return handleError(
      {
        message: error.message,
      },
      400
    );
  }
};
