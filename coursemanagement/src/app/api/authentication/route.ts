import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:Request){

    const jwtKey:string = process.env.JWT_SECRET as string;

    const {email,password}:{email:string,password:string} = await request.json();

    console.log(email,password);

    try{
        const result = await sql`SELECT password FROM users 
                                WHERE email = ${email};`

        const hashedPassword = result.rows[0].password;
        
        if(await bcrypt.compare(password,hashedPassword)){
            console.log('ok');
        }else{
            throw("Wrong Password");
        }

        const token = jwt.sign({email:`${email}`},jwtKey,{expiresIn:'2h'})
        console.log(token)
        //Give back the jwt token
        return NextResponse.json({jwt:token},{status:200})
    }catch(error){
        return NextResponse.json({error},{status:500})
    }
}