import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { studentRecordsType } from "@/app/profile/[id]/grades/page";
import { enrollmentDataType } from "../get-userEnrollments/route";  
import { letterGradeCalculation } from "../update-userEnrollments/route";

type recordTotalCreditsType = {
    classtypeid:string,
    totalcredit:number,
    requiredcredit:number
}

export async function POST(request:Request, {params}:{params:requestParams}){
    const userid = params.id;
    let studentRecords:studentRecordsType[] = [];
    let requiredCreditMap:{[key:string]:number} = {
        1:6,
        2:3,
        3:6,
        4:3,
        5:3,
        6:6,
        7:6,
        8:3,
        9:6
    }
    let totalcredit:{[key:string]:number} = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0
    }
    let totalRecords:recordTotalCreditsType[] = [];
    const studentEnrollmentsQuery = await sql`SELECT * FROM enrollments WHERE userid = ${userid} AND status != 'enrolled'`;
    const studentEnrollments:enrollmentDataType[] = studentEnrollmentsQuery.rows as enrollmentDataType[];
    
    try{

        const classtypeidQueryFunc = async (classid:string):Promise<string>=>{
            const classtypeidQuery = await sql`SELECT classtypeid FROM classes WHERE classid = ${classid}`;
            const classtypeid = classtypeidQuery.rows[0].classtypeid as string 
            return classtypeid;
        }

        const classcreditQueryFunc = async (classid:string):Promise<number>=>{
            const classcreditQuery = await sql`SELECT credit FROM classes WHERE classid = ${classid}`;
            const classcredit = classcreditQuery.rows[0].credit as number 
            return classcredit;
        }
        
        const createStudentRecords = async():Promise<studentRecordsType[]> =>{
            const studentRecordPromises = studentEnrollments.map(async (item)=>{
                const classid = item.classid;
                const classtypeid = await classtypeidQueryFunc(item.classid);
                const classcredit = await classcreditQueryFunc(item.classid)
                totalcredit[classtypeid] += Number(classcredit)
                return{
                    classid:item.classid,
                    grade:item.grade,
                    status:item.status,
                    lettergrade: letterGradeCalculation(item.grade),
                    classtypeid:classtypeid,
                    credit: classcredit
                };
            });
    
            return Promise.all(studentRecordPromises)
        }
    
        await createStudentRecords().then((records)=>{
            studentRecords = records;

        })

        console.log(totalcredit)
        for(let key in totalcredit){
            totalRecords.push({
                classtypeid:key,
                totalcredit:totalcredit[key],
                requiredcredit: requiredCreditMap[key]
            })
        }

        console.log(totalRecords)
        return NextResponse.json({studentRecords:studentRecords,totalRecords:totalRecords},{status:200})
        
    }catch(error){
        return NextResponse.json({error:error},{status:500})
    }
}