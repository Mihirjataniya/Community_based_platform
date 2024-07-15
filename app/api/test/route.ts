import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();


    const response = await fetch('http://127.0.0.1:5000/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Python service');
    }

    const data = await response.json();

    return NextResponse.json({ result: data.result }, { status: 200 });
  } catch (error:any) {
    console.log(error);
    
    return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
  }
}
