import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt, { hash } from "bcryptjs";

 
export async function POST(request: Request) {
  
  const {firstName, lastName, email, password} = await request.json();

  const hashedPassword = await bcrypt.hash(password,10);

  

  try{

    const accountQuery = await sql`SELECT email FROM users WHERE email = ${email}`;

    if(accountQuery.rows[0].email == email){
      return NextResponse.json({message:"There is an existing account"},{status:409})
    }

  }catch(error){
    const result = await sql`INSERT INTO users (firstName, lastName, email, password)
    VALUES(${firstName},${lastName},${email},${hashedPassword});`;

    return NextResponse.json({message:'Successfully created account'},{status:200});
  }
}