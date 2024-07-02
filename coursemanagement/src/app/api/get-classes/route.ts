import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import { convertDateFunction } from "@/helpers/convertDateFunction";
export type classType = {
    classid:string,
    startdate:string,
    instructor:string,
    enddate:string,
    room:number,
    classname:string,
    credit:number
}


export async function GET(request:Request){

    try{
        const result = await sql`SELECT * FROM classes`;
        const queryResult = result?.rows;
        //convert to correct dataformat

        const classData:classType[] = queryResult.map((item)=>{
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

        return NextResponse.json({data:classData},{status:200});
    }catch(error){
        return NextResponse.json({message:error},{status:500});
    };
};