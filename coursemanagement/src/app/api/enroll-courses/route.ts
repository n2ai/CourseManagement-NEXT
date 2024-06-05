import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type coursesType = {
    classid:string,
    classname:string
}

export async function POST(request:Request){
    const {userId, courses}:{userId:string,courses:coursesType[]} = await request.json()
    //userId: user's Id
    //courses: all the course that users want to enroll

    //Include list of required courses
    // let requiredCourse = [];
    // let mustTakenClasses = [];
    // //1st Check prequisite of Student
    // for(const i of courses){
    //     const prequisiteQuery = await sql`SELECT neededclassid FROM prerequisites WHERE classid = ${i.classid};`;
    //     if(prequisiteQuery.rows[0]?.neededclassid){
    //         requiredCourse.push(prequisiteQuery.rows[0].neededclassid)
    //     }
    // }

    // //Check if any required course are needed
    // if(requiredCourse.length === 0){
    //     for(const i of courses){
    //             await sql`INSERT INTO enrollments (userid, classid, status) VALUES (${userId}, ${i.classid},'enrolled')`
    //     }
       
    //     return NextResponse.json({message:"No prerequisite Class needed"},{status:200});
    // }else{
    //     console.log(requiredCourse);
    //     for(const i of requiredCourse){
    //         const mustTakenCourseQuery = await sql`SELECT enrollmentid FROM enrollments WHERE classid = ${i.classid as string} AND status = 'done';`
    //         if(!mustTakenCourseQuery.rows[0]?.enrollmentid){
    //             mustTakenClasses.push(i)
    //         }else{

    //         }
    //     }
        
    //     return NextResponse.json({message:"Must taken or finish these classes",data:mustTakenClasses},{status:200})
    // }


    //2nd check if user already assigned for those class
    

    //3rd what to return 
    // if(requiredCourse.length === 0){
        
    //     for(const i of courses){
    //         await sql`INSERT INTO enrollments (userid, classid, status) VALUES (${userId}, ${i.classid},'enrolled')`
    //     }
    //     console.log("ok to add")
    // }else{
    //     return NextResponse.json({requiredCourse:requiredCourse},{status:400})
    // }

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
                    const enrollmentCheckQuery =  await sql`SELECT enrollmentid FROM enrollments WHERE userid = ${userId} AND classid = ${neededclassid} AND status = 'done';`
                    if(!enrollmentCheckQuery.rows[0]?.enrollmentid){
                        throw("Cannot Take this class")
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