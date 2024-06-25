import { requestParams } from "../get-userCourses/route";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request:Request, {params}:{params:requestParams}){
    const userId = params.id;
    
    const enrollmentQuery = await sql`SELECT * FROM enrollments WHERE userid = ${1}`
    console.log(enrollmentQuery.rows)
    return NextResponse.json({message:"Hello"},{status:200});
}