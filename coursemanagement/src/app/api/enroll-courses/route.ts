import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type coursesType = {
    classid:string,
    classname:string
}

export async function POST(request:Request){
    const {userId, courses}:{userId:string,courses:coursesType[]} = await request.json()
    //userId: user's Id
    //courses: all the course that users want to enroll

    //Include list of required courses
    let requiredCourse = [];

    //1st Check prequisite of Student
    for(const i of courses){
        const prequisiteQuery = await sql`SELECT classid FROM prerequisites WHERE neededclassid = ${i.classid};`;
        if(prequisiteQuery.rows[0]?.classid){
            requiredCourse.push(prequisiteQuery.rows[0].classid)
        }
    }

    
    
    //2nd INSERT into Table
    //3rd response

    
    // try{
    //     const result = sql`INSERT INTO enrollments VALUE`
    // }
    

    console.log("Hello")
    return NextResponse.json({message:"receive"},{status:200})
}