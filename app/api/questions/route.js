import connectDB from "@/libs/db";
import { QuestionSchema } from "@/libs/schemas/questionSchema";
import Passage from "@/models/passage";
import Question from "@/models/question";
import Section from "@/models/section";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const GET = async () => {
  const data = await Question.find().sort({
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

    const validatedData = QuestionSchema.safeParse(body);

    // dalam 1 section tidak boleh ada

    if (!validatedData.success) {
      return handleError(
        {
          message: "Validation failed",
          errors: validatedData.error.errors,
        },
        400
      );
    }

    const checkSequence = await Question.findOne({
      section: validatedData.data.section,
      sequenceNumber: validatedData.data.sequenceNumber,
    });

    // TODO : check sequence number on passage

    // check sequence number tidak boleh duplikat
    if (checkSequence) {
      return handleError(
        {
          message: "Sequence already exist, please use another sequence",
        },
        400
      );
    }

    const question = await Question.create(validatedData.data);

    // check if section exist and passage exist
    await Section.updateOne(
      {
        _id: body.section,
      },
      {
        $push: {
          questions: question._id,
        },
      }
    );

    if (validatedData.data.passage) {
      await Passage.updateOne(
        {
          _id: validatedData.data.passage,
        },
        {
          $push: {
            questions: question._id,
          },
        }
      );
    }

    //TODO : push question to passage
    // const passage = await Question.updateOne(
    //     {
    //         _id: validatedData.data.passageId
    //     },
    //     {
    //         $push: {
    //             questions: question._id
    //         }
    //     }
    // );

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
