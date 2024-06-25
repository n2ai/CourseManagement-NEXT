'use client';
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

            console.log(await res.json())
        }
        fetchData()
    },[])

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
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
        )
    )
}