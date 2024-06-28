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

interface IStudentRecordTable{
    CRN:string,
    grade:number,
    status: string
}

interface IStudentRecordCard{
    classtype:string,
}


export const StudentRecordCard:React.FC = () => {
    return (
        <Card>
            <CardHeader>
                Hello
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}

export default function Grades(){

    return(
        <div className="w-full h-ffull">
            <div className="w-full h-[50px] items-center flex bg-black text-white">
                <h1 className="text-2xl pl-4">Student Record</h1>
            </div>
            
            <div>
                <StudentRecordCard/>
            </div>

        </div>
    )
};