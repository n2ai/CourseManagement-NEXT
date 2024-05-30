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
    let mustTakenClasses = [];
    //1st Check prequisite of Student
    for(const i of courses){
        const prequisiteQuery = await sql`SELECT neededclassid FROM prerequisites WHERE classid = ${i.classid};`;
        if(prequisiteQuery.rows[0]?.neededclassid){
            requiredCourse.push(prequisiteQuery.rows[0].neededclassid)
        }
    }

    console.log(requiredCourse)

    //2nd check what class must be taken
    for(const i of requiredCourse){
        const mustTakenCourseQuery = await sql`SELECT enrollmentid FROM enrollments WHERE classid = ${i.classid};`
        if(!mustTakenCourseQuery.rows[0]?.enrollmentid){
            mustTakenClasses.push(i)
        }
    }

    //3rd what to return 
    if(requiredCourse.length === 0){
        
        for(const i of courses){
            await sql`INSERT INTO enrollments (userid, classid) VALUES (${userId}, ${i.classid})`
        }
        console.log("ok to add")
    }else{
        return NextResponse.json({requiredCourse:requiredCourse},{status:400})
    }


    
    
    //2nd Find if the student already have the prerequisite courses
    for(const i of requiredCourse){
        const takenClassQuery = await sql`SELECT `
    }
    //3rd response

    
    // try{
    //     const result = sql`INSERT INTO enrollments VALUE`
    // }
    

    console.log("Hello")
    return NextResponse.json({message:"receive"},{status:200})
}