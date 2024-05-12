import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:Request){

    const {email,password} = await request.json()

    console.log(email,password)

    try{
        const result = await sql`SELECT password FROM users 
                                WHERE email = ${email};`

        const hashedPassword = result.rows[0].password;
        
        if(await bcrypt.compare(password,hashedPassword)){
            console.log('ok')
        }else{
            throw("Wrong Password")
        }

        return NextResponse.json({message:'OK'},{status:200})
    }catch(error){
        return NextResponse.json({error},{status:500})
    }
}