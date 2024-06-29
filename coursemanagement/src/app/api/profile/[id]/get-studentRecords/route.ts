import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { studentRecordsType } from "@/app/profile/[id]/grades/page";
import { enrollmentDataType } from "../get-userEnrollments/route";  
import { letterGradeCalculation } from "../update-userEnrollments/route";

export async function POST(request:Request, {params}:{params:requestParams}){
    const userid = params.id

    const studentEnrollmentsQuery = await sql`SELECT * FROM enrollments WHERE userid = ${userid}`;
    const studentEnrollments:enrollmentDataType[] = studentEnrollmentsQuery.rows as enrollmentDataType[];
    const classType 

    const studentRecord:studentRecordsType[] = studentEnrollments.map((item)=>{
        return{
            classid:item.classid,
            grade:item.grade,
            status:item.status,
            lettergrade: letterGradeCalculation(item.grade),
            classtypeid: 
        }
    })

    return NextResponse.json({status:200})
}