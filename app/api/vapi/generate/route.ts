import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json(
    { success: true, message: "Testing..." },
    { status: 200 }
  );
}

export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid } = await request.json();
    
    // validate input
    if (!type || !role || !level || !techstack || !amount || !userid) {
        return Response.json(
            { success: false, message: "Missing fields are required!" },
            {status: 400}
        )
    }

    // Ensure amount is a valid number 
    const questionAmount = parseInt(amount, 10);
    if (isNaN(questionAmount) || questionAmount <= 0) {
        return Response.json(
            { success: false, message: "Amount must be a positive number!" },
            {status: 400 }
        )
    }

    try {
      
    const { text: questionsRaw } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${questionAmount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });
        
        // Check if the response is valid JSON
        let questions;

        try {
            questions = JSON.parse(questionsRaw);
            
            if (!Array.isArray(questions) || questions.length === 0) {
                console.log("Invalid questions format:", questions);
                return Response.json(
                    { success: false, message: "Invalid questions format" },
                    {status: 400}
                )
            }
        } catch (error) {
            console.error("Error parsing questions:", error);
            return Response.json(
                { success: false, message: "Error parsing questions" },
                {status: 401}
            )
        }
        
      const interview = {
          role, type, level, amount,
          techstack: techstack.split(","),
          questions,
          userId: userid,
          finalized: true,
          coverImage: getRandomInterviewCover(),
          createdAt: new Date().toISOString()
      }

      await db.collection("interviews").add(interview);

      return Response.json({success: true, message: "Interview generated successfully"}, {status: 200})
  } catch (error) {
    console.error("Error in POST request:", error);

    return Response.json(
      { success: false, message: "Error in POST request" },
      { status: 500 }
    );
  }
}
