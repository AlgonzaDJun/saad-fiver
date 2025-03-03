import { NextResponse } from "next/server";

export function handleError(error, statusCode = 500) {
    console.error('Error:', error); // Log error untuk debugging
  
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'An error occurred',
        errors: error.errors || null, // Detail error validasi (jika ada)
      },
      {
        status: statusCode,
      }
    );
  }