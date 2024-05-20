import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { cookies } from 'next/headers'
type JwtPayload = {
    email:string,
    iat:number,
    exp:number
}

export async function POST(request:Request){
    //Extract cookie
    
    const jwt:string = cookies().get('jwt')?.value!

    //Request JSON
    const requestJson = await request.json();

    //Get UserId From Request JSON
    const userId = requestJson.userId;
    
    //Get secret key
    const secretKey = process?.env?.JWT_SECRET!;
    
    try{

        //Check JWT
        const decoded = jsonwebtoken.verify(jwt,secretKey) as JwtPayload;
        
        //Get User email
        const userEmail = decoded.email;

        const result = await sql`SELECT email FROM users WHERE email = ${userEmail};`;

        if(result.rows[0].email == userEmail){
            return NextResponse.json({message:"OK"},{status:200});
        }else{
            throw("Wrong Email")
        }

    }catch(err){
        return NextResponse.json({message:err},{status:500})
    }
}