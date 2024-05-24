"use client"

import { ColumnDef } from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Classes = {
  classid: string,
  classname: string,
  startdate: string,
  instructor: string,
  enddate:string,
  room: number,
  credit: number,
}

export const columns: ColumnDef<Classes>[] = [
  {
    accessorKey:"classid",
    header:"Class Id"
  },{
    accessorKey:"classname",
    header:"Class Name"
  },{
    accessorKey:"startdate",
    header:"Start Date"
  },{
    accessorKey:"instructor",
    header:"Instructor"
  },{
    accessorKey:"enddate",
    header:"End Date"
  },{
    accessorKey:"room",
    header:"Room"
  },{
    accessorKey:"credit",
    header:"Credit"
  }
];

