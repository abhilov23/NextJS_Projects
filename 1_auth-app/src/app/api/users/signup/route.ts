import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
     try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        
        //check if the user already exists 
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" });
        }

        //check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        //create new user
        const newUser = new User({ username, email, password: hashedPassword });
        const userSaved = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: userSaved,

        })


     } catch (error: any) {
        return NextResponse.json({error: error.message})
     }
}