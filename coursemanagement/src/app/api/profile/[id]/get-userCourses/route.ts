import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { classType } from "@/app/api/get-classes/route";
import { convertDateFunction } from "@/app/api/get-classes/route";

type requestParams = {
    id:number
}

type userCourses = {
    classid:string
}



export async function POST(request:Request, {params}:{params:requestParams}){
    
    const userId = params.id;
    let userCourses:userCourses[] = [];
    let classInformation:classType[] = [];

    try{
        const classInformationQuery = await sql`SELECT * FROM classes WHERE classid IN (SELECT classid FROM enrollments WHERE userid = ${userId});`;
        const classInformationQueryResult = classInformationQuery?.rows; 

        classInformation = classInformationQueryResult.map((item)=>{
            const {classtypeid, ...data} = item;
            return {
                classid:data.classid,
                startdate:convertDateFunction(data.startdate),
                instructor:data.instructor,
                enddate:convertDateFunction(data.enddate),
                room:data.room,
                classname:data.classname,
                credit: Number(data.credit),
            }
        })

        console.log(classInformationQueryResult)

        return NextResponse.json({data:classInformation},{status:200})

    }catch(err){
        return NextResponse.json({error:err},{status:500})
    }
}