'use client';

import { useEffect, useState } from "react"
import { Classes, columns } from "./columns"
import { DataTable } from "./data-table"


// async function getData(): Promise<Classes[]> {
//   // Fetch data from your API here.

//   //Sample code
//   // const res = await fetch('http://localhost:3000/api/authentication',{
//   //           method:'POST',
//   //           headers:{
//   //               'Content-Type':'application/json'
//   //           },
//   //           body:JSON.stringify(values)
//   //       })

//   //       if(res.status === 200){
            
//   //           const responseJSON = await res.json();
//   //           const jwt:string = responseJSON.jwt;
//   //           const userId:number = responseJSON.userId;
            
//   //           Cookies.set('jwt',jwt);
//   //           push(`http://localhost:3000/profile/${userId}`);
//   //       }else{
//   //           setAlertTitle("Wrong Credentials")
//   //           setAlertDescription("Please try to log in again")
//   //           setAlertVariant("destructive")
//   //           setAlert(true)
//   //  }

//   const res = await fetch('http://localhost:3000/api/get-classes',{
//     method:'POST',
//     headers:{
//       'Content-Type':'application/json'
//     }
//   })

  
//   const data:Classes[] = [{
//     classId:'1',
//     className:'1',
//     startDate:'1',
//     instructor:'1',
//     endDate:'1',
//     room:'1',
//     credit:1
//   }]

//   return data
// }

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
