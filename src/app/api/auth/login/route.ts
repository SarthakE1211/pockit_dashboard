import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
     console.log("POST called");
    const { username, password } = await request.json();
   
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Call backend API
    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      console.error('BACKEND_API_URL not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success && data.token) {
      // Create response with secure httpOnly cookie
      const res = NextResponse.json(
        { success: true, message: 'Login successful' },
        { status: 200 }
      );

      // Set httpOnly cookie for token
      res.cookies.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return res;
    } else {
      return NextResponse.json(
        { success: false, message: data.message || 'Login failed' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
