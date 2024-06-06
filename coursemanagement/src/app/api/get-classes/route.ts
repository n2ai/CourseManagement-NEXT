import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export type classType = {
    classid:string,
    startdate:string,
    instructor:string,
    enddate:string,
    room:number,
    classname:string,
    credit:number,
}

export const convertDateFunction = (item:string):string=>{
    let date = new Date(item);

    // Extract month, day, and year from the Date object
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();

    // Format the date as MM-DD-YYYY
    let formattedDate = `${month}-${day}-${year}`;

    return(formattedDate); 
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