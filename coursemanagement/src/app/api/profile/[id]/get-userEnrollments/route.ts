import { requestParams } from "../get-userCourses/route";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { convertDateFunction } from "@/app/api/get-classes/route";
import { enrollmentType } from "@/app/profile/[id]/adjustClass/page";

//Enrollemnt Query
//Check if enrollment grade is there yet
//IF there is, query the actual grade
//IF not, make it 0.0

type enrollmentDataType = {
    enrollmentid:number,
    userid:number,
    classid:string,
    enrollmentdate:string,
    status:string
}


export async function POST(request:Request, {params}:{params:requestParams}){
    const userId = params.id;
    
    const enrollmentQuery = await sql`SELECT * FROM enrollments WHERE userid = ${userId} AND `
    
    const enrollmentData:enrollmentDataType[] = enrollmentQuery.rows as enrollmentDataType[];

    const classIdArray:string[] = enrollmentData.map(item=>item.classid);
    

    console.log(enrollmentData)

    return NextResponse.json({message:"Hello"},{status:200});
}