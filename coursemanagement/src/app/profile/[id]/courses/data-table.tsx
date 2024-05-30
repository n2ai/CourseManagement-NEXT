"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

import { PageContext } from "../layout";
import { useContext } from "react";
import { ICartItems } from "../layout";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const setCart = useContext(PageContext);

    const table = useReactTable({
        data,
        columns,
        getPaginationRowModel:getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state:{
            sorting,
            columnFilters
        }
    })
    
    const handleRowClick = (cell:any) => {
        const className = cell.row.original.classname;
        const classId = cell.row.original.classid;
        const cartItem:ICartItems = {
            classid:classId,
            classname:className
        }

       

        setCart((prev:ICartItems[])=>{
            if(prev.length === 4){
                alert("Cannot add more than 4 classes");
                return prev;
            }else{
                for(const i of prev){
                    if(i.classid === cartItem.classid){
                        return prev
                    }
                }
                return [cartItem,...prev]
            }
        });
    }
  

  return (
    <div>
        <div className="flex items-center py-4">
            <Input placeholder="Filter class name..." 
                value={(table.getColumn("classname")?.getFilterValue() as string) ?? ""}
                onChange={(event=>{
                    table.getColumn("classname")?.setFilterValue(event.target.value)
                })}
                className="max-w-sm"
            />
            
        </div>   
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} onClick={()=>handleRowClick(cell)}
                        className="cursor-pointer">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm"
                        onClick={()=>table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        Previous
                </Button>

                <Button variant="outline" size="sm"
                        onClick={()=>table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        Next
                </Button>
            </div>
        </div>
    </div>
    
  )
}
