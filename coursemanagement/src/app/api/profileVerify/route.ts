import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

type JwtPayload = {
    email:string,
    iat:number,
    exp:number
}

export async function POST(request:Request){
    //Extract cookie
    const cookie = request.headers.get('Cookie');

    //Slice cookie to get jwt
    const jwt:string = cookie?.slice(4)!;

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