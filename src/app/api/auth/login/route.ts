
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
    console.log("backendUrl", backendUrl);

    if (!backendUrl) {
      console.error('BACKEND_API_URL not configured');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }
    const params = new URLSearchParams({
      API: "Login",
      LoginName: username,   // exact case
      Password: password,
      IPAddress: "127.0.0.1",
      Source: "Web",
    });


    console.log("params", params);

    const response = await fetch(`${backendUrl}?${params.toString()}`, {

    });

    const data = await response.json();
    console.log("data", data);


    if (data.RefreshToken && data.EncryptedToken) {
      // Create response with secure httpOnly cookie
      const res = NextResponse.json(
        { success: true, user: data },
        { status: 200 }
      );

      // Set httpOnly cookie for token
      res.cookies.set('token', data.EncryptedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return res;
    } else {
      return NextResponse.json(
        { success: false, message: data.Message },
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
