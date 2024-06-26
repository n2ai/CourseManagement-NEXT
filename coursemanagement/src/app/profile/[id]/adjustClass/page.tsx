'use client';
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

    console.log(enrollment)

    const tableCellArray = enrollment?.map((item, index)=>{
        return(
            <TableRow key={index}>
                <TableCell>{item.CRN}</TableCell>
                <TableCell>{item.enrollmentdate}</TableCell>
                <TableCell>
                    <Input type="number" placeholder={item.grade.toString()}></Input>
                    / 4.0
                </TableCell>
                <TableCell>
                    
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