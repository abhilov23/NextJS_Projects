import { NextResponse } from "next/server";

export async function GET() {
    try {
        // ... previous code remains the same

        const response = await NextResponse.json(
            {
                message: "Logout successful",
                version: true
            }
        );

        // Fix: Replace 'Response' with 'nextResponse'
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        return response;


    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            statusCode: 500
        });
    }
}
