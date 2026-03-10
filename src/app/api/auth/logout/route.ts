import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UserID is required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      console.error("BACKEND_API_URL not configured");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      API: "Logout",
      UserID: userId,
    });

    console.log("Logout params:", params.toString());

    const response = await fetch(`${backendUrl}?${params.toString()}`);

    console.log("Logout response:", response);

    const data = await response.json();

    const res = NextResponse.json(data, { status: response.status });

    // Clear cookies
    res.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Logout API error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}