import connectDB from "@/libs/db";
import Question from "@/models/question";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
    try {
        await connectDB();
        const id = params.id;

        if (!isValidObjectId(id)) {
            return NextResponse.json({
                error: "Invalid ID"
            }, {
                status: 400
            });
        }

        const data = await Question.findById(id);

        if (!data) {
            return NextResponse.json({
                error: "Data not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            data,
            success: true,
            message: "Success get data"
        });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    }
}

// PUT AND DELETE