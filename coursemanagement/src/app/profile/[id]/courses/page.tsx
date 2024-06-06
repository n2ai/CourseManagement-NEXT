'use client';

import { useEffect, useState } from "react"
import { Classes, columns } from "./columns"
import { DataTable } from "./data-table"




export default function Courses() {
  
  const [classData, setClassData] = useState<Classes[]>(
    [{
      classid:'1',
      classname:'1',
      startdate:'1',
      instructor:'1',
      enddate:'1',
      room:1,
      credit:1
    }]
  )
  const [render, setRender] = useState<boolean>(false)
  

  useEffect(()=>{
    const getData = async ()=>{
      const res = await fetch('http://localhost:3000/api/get-classes',{
        method:'GET'
      })

      const resJSON = await res.json()
      const data = resJSON.data
      
      setClassData(data)
      setRender(true)
    }

    getData()
  },[])
  
  return ( render &&
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={classData} />
    </div>
  )
}
