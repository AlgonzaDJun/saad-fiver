import connectDB from "@/libs/db";
import { QuestionSchema } from "@/libs/schemas/questionSchema";
import Question from "@/models/question";
import { handleError } from "@/utils/errorHandler";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
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

    const data = await Question.findById(id);

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

    return NextResponse.json({
      data,
      success: true,
      message: "Success get data",
    });
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

// PUT AND DELETE
export const PUT = async (request, { params }) => {
  try {
    const body = await request.json();
    const id = params.id;
    await connectDB();

    const validatedData = QuestionSchema.safeParse(body);

    if (!validatedData.success) {
      return handleError(
        {
          message: "Validation failed",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const query = {
      section: validatedData.data.section,
      sequenceNumber: validatedData.data.sequenceNumber,
      _id: { $ne: id },
    }

    if(validatedData.data.passage) {
      query.passage = validatedData.data.passage;
    }

    const checkSequence = await Question.findOne(query);

    // check sequence number tidak boleh duplikat
    if (checkSequence) {
      return handleError(
        {
          message: "Sequence already exist, please use another sequence",
        },
        400
      );
    }

    await Question.updateOne(
      {
        _id: params.id,
      },
      validatedData.data
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
        status: 400,
      }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    await connectDB();
    const data = await Question.findByIdAndDelete(id);

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

    return NextResponse.json({
      success: true,
      message: "Success delete data",
    });

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
