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
    status:string,
    isChecked:boolean
};

export type fetchEnrollmenType = Omit<enrollmentType,"isChecked">;

export type updateEnrollmentType = {
    CRN:string,
    grade:number,
    status:string,
    isChecked:boolean
}


export default function AdjustClass({params}:{params: {id:number}}){
    const [render,setRender] = useState<boolean>(false);
    const [enrollment, setEnrollments] = useState<enrollmentType[]>([{
        CRN: "",
        enrollmentdate:"",
        grade: 0.00,
        status:"",
        isChecked:false
    }]);

    //Create a usteState that control the new update state
    const userId = params.id
    
    const fetchData = async ()=>{
        const res = await fetch(`http://localhost:3000/api/profile/${userId}/get-userEnrollments`,{
            method:'POST'
        })

        const responseJson = await res.json();
        setEnrollments(
            responseJson.data.map((item:fetchEnrollmenType)=>{
                return {
                    CRN:item.CRN,
                    enrollmentdate:item.enrollmentdate,
                    grade:item.grade,
                    status:item.status,
                    isChecked:false
                }
            })
        )
        setRender(true);
        
    }

    useEffect(()=>{
        fetchData();
        
    },[])

    //Logic:
    //Update User enrollments
    //Using ClassId for checking if the thing is done or not
    //Cannot put input number out of range 0.00 to 4.00 
    //If the button is clicked but the input is 0.00 cannot submit

    const handleUpdateEnrollment = (CRN:string)=>{
        const updateEnrollmentInfo = enrollment.filter(item=>item.CRN == CRN)[0];
        const isChecked = updateEnrollmentInfo.isChecked;
        
        if(isChecked === true){
            updateEnrollmentInfo.status = "finished";
        }else{
            updateEnrollmentInfo.status = "enrolled";
        }

        const grade = updateEnrollmentInfo.grade;
        if(isChecked === true && (grade > 0.00 && grade <= 4.00 )){
            const updateEnrollmentResponse = fetch(`http://localhost:3000/api/profile/${userId}/update-userEnrollments`,{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(updateEnrollmentInfo)
            })

        }else if(updateEnrollmentInfo.isChecked === false){
            alert("Must check the box before update");
        }else if((grade <= 0.00) || (grade > 4.00) ){
            alert("Invalid grade");
        }else{
            alert("Missing Credentials");
        }
    }

    const handleCheckBoxEnrollment = (e:React.FormEvent<HTMLButtonElement>)=>{
        
        const CRN = e.currentTarget.id
        console.log(e.currentTarget)
        setEnrollments((prev:enrollmentType[])=>{
            const enrollmentArray:enrollmentType[] = prev.map((item:enrollmentType)=>{
                return item.CRN === CRN ? {...item,isChecked: !item.isChecked }  : item;
            })

            return enrollmentArray;
        })
    }

    const handleGradeInputEnrollment = (e:React.FormEvent<HTMLInputElement>)=>{
        const value = Number(e.currentTarget.value);
        
        const CRN = e.currentTarget.name;
        setEnrollments((prev:enrollmentType[])=>{
            const enrollmentArray:enrollmentType[] = prev.map((item:enrollmentType)=>{
                return item.CRN === CRN ? {...item, grade: value}  : item;
            })

            return enrollmentArray;
        })
        
    }



    const tableCellArray = enrollment?.map((item, index)=>{
        return(
            <TableRow key={index}>
                <TableCell>{item.CRN}</TableCell>
                <TableCell>{item.enrollmentdate}</TableCell>
                <TableCell className="flex items-center">
                    <Input onChange={(e)=>handleGradeInputEnrollment(e)} id={item.CRN} name={item.CRN} max={4.00} min={1.00} className="w-[50%]" type="number" placeholder={item.grade.toString()}></Input>
                    / 4.0
                </TableCell>
                <TableCell>
                    <Checkbox onClick={(e)=>handleCheckBoxEnrollment(e)} id={item.CRN} name={item.CRN} value={"finished"} ></Checkbox>
                </TableCell>
                <TableCell>
                    <Button onClick={(e)=>handleUpdateEnrollment(item.CRN)}>Update</Button>
                </TableCell>
            </TableRow>
        )   
    })

    console.log(enrollment)

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