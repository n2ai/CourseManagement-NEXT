import { requestParams } from "../get-userCourses/route";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request:Request, {params}:{params:requestParams}){
    return NextResponse.json({message:"Hello"},{status:200})
}