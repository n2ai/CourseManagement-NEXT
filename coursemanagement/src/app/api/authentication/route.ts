import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:Request){

    const jwtKey:string = process.env.JWT_SECRET as string;

    const {email,password}:{email:string,password:string} = await request.json();

    try{
        const result = await sql`SELECT password,id FROM users 
                                WHERE email = ${email};`

        const hashedPassword = result.rows[0].password;
        const userId = result.rows[0].id;
        
        if(await bcrypt.compare(password,hashedPassword)){
            console.log('ok');
        }else{
            throw("Wrong Password");
        }

        const token = jwt.sign({email:`${email}`},jwtKey,{expiresIn:'2h'})
        //Give back the jwt token
        return NextResponse.json({jwt:token,userId:userId},{status:200})
    }catch(error){
        return NextResponse.json({error},{status:500})
    }
}