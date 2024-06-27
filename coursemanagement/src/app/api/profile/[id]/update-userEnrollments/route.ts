import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { enrollmentType } from "@/app/profile/[id]/adjustClass/page";

export async function PUT(request:Request,{params}:{params:requestParams}){
    console.log(await request.json());
    return NextResponse.json({status:200})
}