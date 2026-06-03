import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subjects, journals, upcomingDeadlines } = body;

    const prompt = `
      You are an expert AI Study Strategist for a student.
      Here is the student's data:
      Today's Subjects: ${JSON.stringify(subjects)}
      Recent Journal Ratings (1-5, 5 is best): ${JSON.stringify(journals)}
      Upcoming Deadlines/Tasks: ${JSON.stringify(upcomingDeadlines)}

      Based on this data, identify which subjects are most urgent (due to low journal ratings of 1-3, pending deadlines, or high difficulty).
      Provide a specific study schedule recommendation or sequence focusing on those urgent subjects.
      Keep it to one concise, highly actionable, and encouraging sentence (max 30 words) so it can fit nicely as a to-do item.
      Please write the response in Indonesian.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ advice: response.text });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    
    if (error.status === 429) {
      return NextResponse.json({ error: "Google Gemini API rate limit exceeded. Please wait about 30 seconds and try again." }, { status: 429 });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
