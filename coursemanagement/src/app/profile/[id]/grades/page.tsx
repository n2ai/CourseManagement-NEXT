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
    classtypeid:string,
    credit:number
}

export type classTypesType = {
    classtypeid:string,
    typename:string,
    recordlist:studentRecordsType[],
    totalcredit:number,
    requiredcredit:number
}

export type recordTotalCreditsType = {
    classtypeid:string,
    totalcredit:number,
    requiredcredit:number
}
export const StudentRecordCard:React.FC<Omit<classTypesType,"classtypeid">> = ({typename,recordlist, totalcredit,requiredcredit}) => {
    const cardCells = recordlist.map((item,index)=>{
        return(
            <TableRow key={index}>
                <TableCell>
                    {item.classid}
                </TableCell>
                <TableCell>
                    {item.grade}
                </TableCell>
                <TableCell>
                    {item.lettergrade}
                </TableCell>
                <TableCell>
                    {item.status}
                </TableCell>
            </TableRow>
        )
    })
    
    return (
        <Card className="w-[30%] border border-black">
            <CardHeader>
                <CardTitle>{typename}</CardTitle>
                <CardDescription>Credit: {totalcredit} / {requiredcredit}</CardDescription>
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

                    <TableBody>
                       {cardCells}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default function Grades({params}:{params:{id:number}}){
    const [render,setRender] = useState<boolean>(false);
    const [classTypes, setClassTypes] = useState<classTypesType[]>()
    const [studentRecords, setStudentRecords] = useState<studentRecordsType[]>([{
        classid:"hello",
        grade: 0,
        lettergrade:"",
        status: "",
        classtypeid:"",
        credit:0
    }])
    const [totalRecords, setTotalRecords] = useState<recordTotalCreditsType[]>([{
        classtypeid: "",
        totalcredit: 0,
        requiredcredit: 0
    }])
    
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
            setStudentRecords(data.studentRecords);
            setTotalRecords(data.totalRecords);
            setRender(true);
            
        }).catch((error)=>{
            console.log(error);
            alert(error);
        })

    }

    

    useEffect(()=>{
        fetchData()
    },[])
     
    
    
    const studentRecordCards = classTypes?.map((item,index)=>{
        const recordList = studentRecords?.filter((record)=>record.classtypeid === item.classtypeid);
        let totalcredit = 0;
        let requiredcredit = 0;
        for(const i of totalRecords){
            if(i.classtypeid == item.classtypeid){
                totalcredit = i.totalcredit;
                requiredcredit = i.requiredcredit;
                console.log(totalcredit,requiredcredit)
            }
        }
        return <StudentRecordCard key={index} typename={item.typename} recordlist={recordList} totalcredit={totalcredit} requiredcredit={requiredcredit}></StudentRecordCard>
    })
    
    console.log(totalRecords)

    return(
        render &&
        <div className="w-full h-ffull">
            {/**Title section */}
            <div className="w-full h-[50px] items-center flex bg-black text-white">
                <h1 className="text-2xl pl-4">Student Record</h1>
            </div>

            {/**Student Records Section */}
            <div className="w-full h-full flex flex-wrap gap-3 p-3">
                {studentRecordCards}
            </div>

            {/**Check be able to graduate section */}
            <div>

            </div>

        </div>
    )
};