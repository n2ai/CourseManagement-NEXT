import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt, { hash } from "bcryptjs";
import { json } from 'stream/consumers';
 
export async function POST(request: Request) {
  
  const {firstName, lastName, email, password} = await request.json();

  const hashedPassword = await bcrypt.hash(password,10);

  
  try{
    const result = await sql`INSERT INTO users (firstName, lastName, email, password)
                            VALUES(${firstName},${lastName},${email},${hashedPassword});`;

    return NextResponse.json({message:'Successfully created account'},{status:200});
  }catch(error){
    return NextResponse.json({error},{status:500});
  }
}