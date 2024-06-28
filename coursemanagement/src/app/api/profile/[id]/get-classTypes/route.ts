import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { classTypesType } from "@/app/profile/[id]/grades/page";

export async function POST(request:Request, {params}:{params:requestParams}){
    try{
        const classTypesQuery = await sql`SELECT * FROM classtypes;`;
        const classTypesData:classTypesType[] = classTypesQuery.rows as classTypesType[];
        return NextResponse.json({data:classTypesData},{status:200})
    }catch(err){
        return NextResponse.json({error:err},{status:500})
    }
    
}