import connectDB from "@/libs/db";
import { PassageSchema } from "@/libs/schemas/passageSchema";
import Passage from "@/models/passage";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectDB();
    const data = await Passage.findById(id).populate("questions");

    return NextResponse.json({
      data,
      success: true,
      message: "Success get data",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    const body = await request.json();

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

    const passage = await Passage.findByIdAndUpdate(id, validatedData.data, {
      new: true,
    });

    return NextResponse.json({
      data: passage,
      success: true,
      message: "Success update data",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    const data = await Passage.findByIdAndDelete(id);

    return NextResponse.json({
      data,
      success: true,
      message: "Success delete data",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
