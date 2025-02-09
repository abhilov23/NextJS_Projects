import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

import User from "@models/userModel"

connect();

export async function GET(request:NextRequest){
    try {
      const userID =  await getDataFromToken(request);
      await User.findOne({
        _id: userID
      }).select("-password");
      
      return NextResponse.json({
        success: true,
        data: User
      });


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
            status: 400
        });
    }
}