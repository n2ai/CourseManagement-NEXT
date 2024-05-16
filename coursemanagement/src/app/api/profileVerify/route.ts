import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:Request){
    //Extract cookie
    const cookie = request.headers.get('Cookie');

    //Slice cookie to get jwt
    const jwt = cookie?.slice(4);

    //Request JSON
    const requestJson = await request.json();

    //Get UserId From Request JSON
    const userId = requestJson.userId;
    
    



    return NextResponse.json({message:"Great"},{status:200})
}