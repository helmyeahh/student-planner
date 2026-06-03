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
      Upcoming Deadlines: ${JSON.stringify(upcomingDeadlines)}

      Based on this data, provide ONE short, actionable, and encouraging sentence of advice for today's study session. 
      Focus on subjects with low understanding ratings.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
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
