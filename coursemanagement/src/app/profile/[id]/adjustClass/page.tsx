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
  

export default function AdjustClass(){
    return(
        <div>
            <Table>
                <TableCaption> Use this table to edit the status of the class </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>CRN</TableHead>
                        <TableHead>Class Name</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    )
}