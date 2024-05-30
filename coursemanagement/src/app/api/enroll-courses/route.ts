import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request:Request){
    const {userId, courses} = await request.json()
    //userId: user's Id
    //courses: all the course that users want to enroll


    //1st Check prequisite of Student
    //2nd INSERT into Table
    //3rd response

    // try{
    //     const result = sql`INSERT INTO enrollments VALUE`
    // }
    

    console.log("Hello")
    return NextResponse.json({message:"receive"},{status:200})
}