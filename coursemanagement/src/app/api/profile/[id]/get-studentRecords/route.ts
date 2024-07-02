import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { studentRecordsType } from "@/app/profile/[id]/grades/page";
import { enrollmentDataType } from "../get-userEnrollments/route";  
import { letterGradeCalculation } from "../update-userEnrollments/route";

export async function POST(request:Request, {params}:{params:requestParams}){
    const userid = params.id;
    let studentRecords:studentRecordsType[] = [];
    const studentEnrollmentsQuery = await sql`SELECT * FROM enrollments WHERE userid = ${userid}`;
    const studentEnrollments:enrollmentDataType[] = studentEnrollmentsQuery.rows as enrollmentDataType[];
    try{
        const classtypeidQueryFunc = async (classid:string):Promise<string>=>{
            const classtypeidQuery = await sql`SELECT classtypeid FROM classes WHERE classid = ${classid}`;
            const classtypeid = classtypeidQuery.rows[0].classtypeid as string 
            return classtypeid;
        }
    
        const createStudentRecords = async():Promise<studentRecordsType[]> =>{
            const studentRecordPromises = studentEnrollments.map(async (item)=>{
                const classtypeid = await classtypeidQueryFunc(item.classid);
                return{
                    classid:item.classid,
                    grade:item.grade,
                    status:item.status,
                    lettergrade: letterGradeCalculation(item.grade),
                    classtypeid:classtypeid
                };
            });
    
            return Promise.all(studentRecordPromises)
        }
    
        await createStudentRecords().then((records)=>{
            studentRecords = records;
        })
        console.log(studentRecords);
        return NextResponse.json({data:studentRecords},{status:200})
        
    }catch(error){
        return NextResponse.json({error:error},{status:500})
    }
}