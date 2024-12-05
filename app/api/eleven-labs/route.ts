import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const XI_API_KEY = process.env.ELEVEN_LABS_API_KEY;
    const AGENT_ID = process.env.ELEVEN_LABS_AGENT_ID;

    if (!XI_API_KEY || !AGENT_ID) {
      return NextResponse.json(
        { error: 'Missing API key or Agent ID' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': XI_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Failed to get signed URL: ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (error) {
    console.error('Eleven Labs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 