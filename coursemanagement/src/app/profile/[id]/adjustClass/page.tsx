'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useEffect } from "react";

export type enrollmentType = {
    CRN:string,
    enrollmentdate:string,
    grade:number,
    status:string
}



export default function AdjustClass({params}:{params: {id:number}}){
    const [render,setRender] = useState<boolean>(true);
    const [enrollment, setEnrollments] = useState<enrollmentType[]>();
    //Create a usteState that control the new update state
    const userId = params.id

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch(`http://localhost:3000/api/profile/${userId}/get-userEnrollments`,{
                method:'POST'
            })

            const responseJson = await res.json();
            
            setEnrollments(responseJson.data)
        }
        fetchData()
    },[])

    const handleUpdateEnrollment = (classId:string)=>{

    }

    const handleCheckBoxEnrollment = (classId:string)=>{

    }

    const handleGradeInputEnrollment = (classId:string)=>{
        
    }

    console.log(enrollment)

    const tableCellArray = enrollment?.map((item, index)=>{
        return(
            <TableRow key={index}>
                <TableCell>{item.CRN}</TableCell>
                <TableCell>{item.enrollmentdate}</TableCell>
                <TableCell className="flex items-center">
                    <Input className="w-[50%]" type="number" placeholder={item.grade.toString()}></Input>
                    / 4.0
                </TableCell>
                <TableCell>
                    <Checkbox value={"finished"} ></Checkbox>
                </TableCell>
                <TableCell>
                    <Button>Update</Button>
                </TableCell>
            </TableRow>
        )   
    })

    return(
        render && 
        (
            <div>
                <Table>
                    <TableCaption> Use this table to edit the status of the class </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>CRN</TableHead>
                            <TableHead>Enrollment Date</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Finished</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/** Will drop the array of value here */}
                        {tableCellArray}
                    </TableBody>
                </Table>
            </div>
        )
    )
}