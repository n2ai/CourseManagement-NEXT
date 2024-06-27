import { requestParams } from "../get-userCourses/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export default function UPDATE(request:Request,{params}:{params:requestParams}){
    console.log("Hello");
    return NextResponse.json({data:"hello"},{status:200})
}