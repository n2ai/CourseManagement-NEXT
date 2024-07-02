import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { enrollmentType } from "@/app/profile/[id]/adjustClass/page";
import { letterGradeCalculation } from "@/helpers/letterGradeCalculation";

export async function PUT(request:Request,{params}:{params:requestParams}){
    let enrollmentData = await request.json()
    let classid = enrollmentData.CRN;
    let grade = enrollmentData.grade;
    let status = "";
    const userid = params.id;

    //We will update the value and justify if it is a pass or not
    
    if(letterGradeCalculation(grade) !== 'D' && letterGradeCalculation(grade) !== 'F'){
        status = "passed"
    }else{
        status = "failed"
    }


    const enrollmentDataUpdateQuery = await sql`UPDATE enrollments SET status = ${status},
                                                grade = ${grade} WHERE classid = ${classid} AND userid = ${userid};`
    

    return NextResponse.json({status:200})
}