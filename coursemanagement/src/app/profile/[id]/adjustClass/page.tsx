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
    const [enrollment, setEnrollments] = useState<enrollmentType[]>([{
        CRN: "",
        enrollmentdate:"",
        grade: 0.00,
        status:""
    }]);
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

    //Logic:
    //Update User enrollments
    //Using ClassId for checking if the thing is done or not
    //Cannot put input number out of range 0.00 to 4.00 
    //If the button is clicked but the input is 0.00 cannot submit

    const handleUpdateEnrollment = (classId:string)=>{

    }

    const handleCheckBoxEnrollment = (classId:string)=>{

    }

    const handleGradeInputEnrollment = (e:React.FormEvent<HTMLInputElement>)=>{
        const value = Number(e.currentTarget.value);
        const CRN = e.currentTarget.name;
        setEnrollments((prev:enrollmentType[])=>{
            const enrollmentArray:enrollmentType[] = prev.map((item:enrollmentType)=>{
                return item.CRN === CRN ? {...item, grade: value}  : item
            })

            return enrollmentArray
        })
    }

    console.log(enrollment)

    const tableCellArray = enrollment?.map((item, index)=>{
        return(
            <TableRow key={index}>
                <TableCell>{item.CRN}</TableCell>
                <TableCell>{item.enrollmentdate}</TableCell>
                <TableCell className="flex items-center">
                    <Input id={item.CRN} name={item.CRN} max={4.00} min={1.00} className="w-[50%]" type="number" placeholder={item.grade.toString()}></Input>
                    / 4.0
                </TableCell>
                <TableCell>
                    <Checkbox id={item.CRN} name={item.CRN} value={"finished"} ></Checkbox>
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