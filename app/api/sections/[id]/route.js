import connectDB from "@/libs/db";
import { SectionSchema } from "@/libs/schemas/sectionSchema";
import Section from "@/models/section";
import { handleError } from "@/utils/errorHandler";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectDB();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          error: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const data = await Section.findById(id)
      .populate("passages")
      .populate("questions")
      .exec();

    if (!data) {
      return NextResponse.json(
        {
          error: "Data not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        data,
        success: true,
        message: "Success get data",
      },
      {
        status: 200,
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

export const PUT = async (req, { params }) => {
  const id = params.id;

  try {
    await connectDB();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          error: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const data = await Section.findById(id);

    if (!data) {
      return NextResponse.json(
        {
          error: "Data not found",
        },
        {
          status: 404,
        }
      );
    }

    const body = await req.json();

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

    await Section.findByIdAndUpdate(id, body);

    return NextResponse.json(
      {
        message: "Success update data",
      },
      {
        status: 200,
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

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          error: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }

    const data = await Section.findById(id);

    if (!data) {
      return NextResponse.json(
        {
          error: "Data not found",
        },
        {
          status: 404,
        }
      );
    }

    await Section.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Success delete data",
      },
      {
        status: 200,
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
