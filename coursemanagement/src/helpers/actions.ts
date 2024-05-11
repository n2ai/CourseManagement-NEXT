'use server'

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const CreateUser = async (formData:FormData)=>{

    const rawFormData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    const {userFirstName, userLastName, userEmail, userPassword} = rawFormData;



    try {
        const result =
          await sql`INSERT INTO users (firstName,lastName,email,password) 
                    VALUES (${userFirstName},${userLastName},${userEmail})`;
        return NextResponse.json({ result }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

}

