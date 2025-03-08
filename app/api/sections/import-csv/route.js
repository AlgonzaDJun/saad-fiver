import fs from "fs";
import csv from "csv-parser";
import Section from "@/models/section";
import Question from "@/models/question";
import Passage from "@/models/passage";
import connectDB from "@/libs/db";

import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import Exam from "@/models/exam";
import { Readable } from "stream";

// export const config = {
//   api: {
//     bodyParser: false, // Nonaktifkan bodyParser default Next.js
//   },
// };

export async function POST(request) {
  try {
    // Ambil file dari FormData
    const formData = await request.formData();
    const file = formData.get("file");
    const exam = formData.get("exam");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("Uploaded file:", file.name, file.size);

    // save file temporary
    // const filePath = `./tmp/${file.name}`;
    // const fileBuffer = await file.arrayBuffer();
    // fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // const results = [];

    // // Baca file CSV
    // return new Promise((resolve, reject) => {
    //   fs.createReadStream(filePath)
    //     .pipe(csv({ separator: ";" })) // Gunakan separator ;
    //     .on("data", (data) => results.push(data))
    //     .on("end", async () => {

    // ahead is save file temporary

    // Konversi file ke buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const results = [];

    // Buat stream dari buffer
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); // Tandai akhir stream

    // Baca file CSV langsung dari buffer
    return new Promise((resolve, reject) => {
      readableStream
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          console.log("Parsed row:", data);
          results.push(data);
        })
        .on("end", async () => {
          try {
            await connectDB(); // Hubungkan ke MongoDB

            // Proses setiap baris CSV
            for (const row of results) {
              const {
                section_name,
                section_type,
                section_description,
                section_estimatedTime,
                passage_title,
                passage_text,
                passage_difficulty,
                passage_tags,
                questionContent,
                questionType,
                questionSubType,
                choice1,
                choice2,
                choice3,
                choice4,
                choice5,
                correctChoice,
                severity,
                sequenceNumber,
                answerNote,
                question_tags,
              } = row;

              // Simpan Section
              const section = new Section({
                name: section_name,
                type: section_type,
                description: section_description,
                estimatedTime: parseInt(section_estimatedTime),
                questions: [],
                passages: [],
              });

              const savedSection = await section.save();
              const sectionId = savedSection._id;

              await Exam.findByIdAndUpdate(
                exam,
                { $push: { sections: sectionId } },
                { new: true }
              );

              // Simpan Passage (jika ada)
              let passageId = null;
              if (passage_title && passage_text) {
                const passage = new Passage({
                  title: passage_title,
                  text: passage_text,
                  difficulty: passage_difficulty,
                  tags: passage_tags.split(", "),
                  section: sectionId,
                  questions: [],
                });

                const savedPassage = await passage.save();
                passageId = savedPassage._id;

                // Update section dengan passageId
                savedSection.passages.push(passageId);
                await savedSection.save();
              }

              // Simpan Question
              const question = new Question({
                questionContent,
                questionType,
                questionSubType,
                choices: [
                  { text: choice1, isCorrect: correctChoice === "1" },
                  { text: choice2, isCorrect: correctChoice === "2" },
                  { text: choice3, isCorrect: correctChoice === "3" },
                  { text: choice4, isCorrect: correctChoice === "4" },
                  { text: choice5, isCorrect: correctChoice === "5" },
                ],
                severity,
                sequenceNumber: parseInt(sequenceNumber),
                answerNote,
                tags: question_tags.split(", "),
                section: sectionId,
                passage: passageId,
              });

              const savedQuestion = await question.save();
              const questionId = savedQuestion._id;

              // Update section dengan questionId
              savedSection.questions.push(questionId);
              await savedSection.save();

              // Update passage dengan questionId (jika ada passage)
              if (passageId) {
                const passage = await Passage.findById(passageId);
                passage.questions.push(questionId);
                await passage.save();
              }
            }

            // Hapus file sementara
            // fs.unlinkSync(filePath);

            // Return success response
            resolve(
              NextResponse.json(
                {
                  message: "Data imported successfully",
                },
                { status: 200 }
              )
            );
          } catch (error) {
            // Hapus file sementara jika terjadi error
            // fs.unlinkSync(filePath);

            // Return error response
            reject(
              NextResponse.json(
                { message: "Failed to import data" },
                { status: 500 }
              )
            );
          }
        })
        .on("error", (error) => {
          // Hapus file sementara jika terjadi error
          // fs.unlinkSync(filePath);

          // Return error response
          reject(
            NextResponse.json(
              { message: "Failed to read CSV file" },
              { status: 500 }
            )
          );
        });
    });
  } catch (error) {
    console.error("Error importing data:", error);
    return NextResponse.json(
      { message: "Failed to import data" },
      { status: 500 }
    );
  }
}
