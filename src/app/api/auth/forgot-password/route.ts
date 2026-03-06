import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // Validate input
    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }
    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error('BACKEND_API_URL not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      API: "ForgotPassword",
      LoginName: username,   // exact case

      IPAddress: "127.0.0.1",
      Source: "Web",
    });


    console.log("params", params);

    const response = await fetch(`${backendUrl}?${params.toString()}`, {

    });
    console.log("response forgot password", response);

    // Call backend API


    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Forgot password API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
