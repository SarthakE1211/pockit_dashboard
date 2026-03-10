import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { success: false, message: "No refresh token found" },
                { status: 401 }
            );
        }
        const backendUrl = process.env.BACKEND_API_URL;

        const params = new URLSearchParams({
            API: "RefreshToken",
            RefreshToken: refreshToken,
            IPAddress: "127.0.0.1",
        });

        const apiResponse = await fetch(`${backendUrl}?${params.toString()}`, {
            method: "GET",
        });

        const data = await apiResponse.json();

        if (data.Status !== "Success") {
            return NextResponse.json(
                { success: false, message: "Token refresh failed" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true });

        // set new access token
        response.cookies.set("accessToken", data.AccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 15,
            path: "/",
        });

        // optionally update refresh token
        if (data.RefreshToken) {
            response.cookies.set("refreshToken", data.RefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
        }

        return response;
    } catch (error) {
        console.error("Refresh token error:", error);

        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}