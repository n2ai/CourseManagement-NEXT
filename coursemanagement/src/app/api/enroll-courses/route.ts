import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type coursesType = {
    classid:string,
    classname:string
}

export async function POST(request:Request){
    const {userId, courses}:{userId:string,courses:coursesType[]} = await request.json()
   

    for(const i of courses){
        //Check if Student already take a course
        const alreadyTakenQuery = await sql`SELECT enrollmentid FROM enrollments WHERE userid = ${userId} AND classid = ${i.classid};`
        if(!alreadyTakenQuery.rows[0]?.enrollmentid){
            
            //Check if class need prerequisite
            const prerequisiteQuery = await sql`SELECT neededclassid FROM prerequisites WHERE classid = ${i.classid};`
            if(!prerequisiteQuery.rows[0]?.neededclassid){
                //No need of prerequisite
                try{
                    await sql`INSERT INTO enrollments (userid, classid, status) VALUES (${userId}, ${i.classid}, 'enrolled')`
                    
                }catch(err){
                    return NextResponse.json({error:err,message:"Could not take this class due to server error"},{status:500})
                }
            }else{
                const neededclassid = prerequisiteQuery.rows[0]?.neededclassid;
                console.log(neededclassid)
                try{
                    const enrollmentCheckQuery =  await sql`SELECT enrollmentid FROM enrollments WHERE userid = ${userId} AND classid = ${neededclassid} AND status = 'passed';`
                    if(!enrollmentCheckQuery.rows[0]?.enrollmentid){
                        throw("Cannot Take this class")
                    }else{
                        await sql`INSERT INTO enrollments (userid, classid, status) VALUES (${userId}, ${i.classid}, 'enrolled')`
                    }
                }catch(err){
                    return NextResponse.json({error:err, message:"Cannot take this class",classid:i.classid,neededclassid:neededclassid},{status:400})
                }
            }

        }else{
            return NextResponse.json({message:"Class Already Taken", data:i.classid},{status:200})
        }
        
    }

    return NextResponse.json({message:"Classes are take successfully"},{status:200})
}