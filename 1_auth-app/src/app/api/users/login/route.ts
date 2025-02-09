import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json()
    const {email, password} = reqBody;

    //check if user exist or not
    const user  = await User.findOne({email})
   
    if(!user){
        return NextResponse.json({error: 'User does not exist'},
            { status: 404 }
        )
    }
    
    //check if the password is correct
    const isPasswordMatch = await bcryptjs.compare(password, user.password)
    
    if(!isPasswordMatch){
        return NextResponse.json({error: 'Invalid Password'},
            { status: 401 }
        )
    }
    
    //creating token data
    const tokenData = {
        userId: user._id,
        email: user.email,
        username: user.username
    }


    //generate JWT
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
    
   const response = NextResponse.json({
    message: "Login successful",
    success: true,
   })
   response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
   })
   
   return response;
    
} catch (error:any) {
    return NextResponse.json({error: error.message},
        { status: 500 }
    )
}
}