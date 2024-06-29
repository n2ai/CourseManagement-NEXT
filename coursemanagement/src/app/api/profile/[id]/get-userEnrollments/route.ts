import { requestParams } from "../get-userCourses/route";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { convertDateFunction } from "@/app/api/get-classes/route";
import { fetchEnrollmenType } from "@/app/profile/[id]/adjustClass/page";

//Enrollemnt Query
//Check if enrollment grade is there yet
//IF there is, query the actual grade
//IF not, make it 0.0

export type enrollmentDataType = {
    enrollmentid:number,
    userid:number,
    classid:string,
    enrollmentdate:string,
    status:string,
    grade:number
}


export async function POST(request:Request, {params}:{params:requestParams}){
    const userId = params.id;
    
    const enrollmentQuery = await sql`SELECT * FROM enrollments WHERE userid = ${userId} AND status = 'enrolled';`
    
    const enrollmentData:enrollmentDataType[] = enrollmentQuery.rows as enrollmentDataType[];

    const userEnrollment:fetchEnrollmenType[] = enrollmentData.map(item=>{
        return {
            CRN:item?.classid,
            enrollmentdate: convertDateFunction(item?.enrollmentdate),
            grade:item?.grade,
            status:item?.status
        }
    })



    return NextResponse.json({data:userEnrollment},{status:200});
}