'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
// interface IStudentRecordTable{
//     CRN:string,
//     grade:number,
//     status: string
// }

export type studentRecordsType = {
    classid:string,
    grade: number,
    lettergrade:string,
    status: string,
    classtypeid:string
}

export type classTypesType = {
    classtypeid:string,
    typename:string
}


export const StudentRecordCard:React.FC<Omit<classTypesType,"classtypeid">> = ({typename}) => {
    return (
        <Card className="w-[30%] border border-black">
            <CardHeader>
                <CardTitle>{typename}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                CRN
                            </TableHead>
                            <TableHead>
                                Grade
                            </TableHead>
                            <TableHead>
                                Letter Grade
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    
                </Table>
            </CardContent>
        </Card>
    )
}

export default function Grades({params}:{params:{id:number}}){

    const [classTypes, setClassTypes] = useState<classTypesType[]>()
    const [studentRecords, setStudenRecords] = useState<studentRecordsType[]>()
    const userId = params.id;

    const fetchData = async ()=>{
        const fetchClassTypes = await fetch(`http://localhost:3000/api/profile/${userId}/get-classTypes`,{
            method:"POST"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            setClassTypes(data.data);
        });

        const fetchStudentRecords = await fetch(`http://localhost:3000/api/profile/${userId}/get-studentRecords`,{
            method:"POST"
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            setStudenRecords(data.data);
            console.log(studentRecords);
        }).catch((error)=>{
            console.log(error);
            alert(error);
        })

    }

    

    useEffect(()=>{
        fetchData()
    },[])
     
    
    const studentRecordCards = classTypes?.map((item,index)=>{
        return <StudentRecordCard key={index} typename={item.typename}></StudentRecordCard>
    })
    

    return(
        <div className="w-full h-ffull">
            <div className="w-full h-[50px] items-center flex bg-black text-white">
                <h1 className="text-2xl pl-4">Student Record</h1>
            </div>
            
            <div className="w-full h-full flex flex-wrap gap-3 p-3">
                {studentRecordCards}
            </div>

        </div>
    )
};