'use client';

import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ICourseInformation{
  title:string,
  CRN:string,
  professor:string,
  startDate:string
};

interface IResponseData{
  classid:string,
  classname:string,
  credit: number,
  endate:string,
  instructor:string,
  room: number,
  startdate: string
}

const courseCards:ICourseInformation[] = [
  {title:'Introduction to Computer Science I',
    CRN: 'CS1301',
    professor:'Yilmaz Emre',
    startDate:"N/a"
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    startDate:"N/a"
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    startDate:"N/a"
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    startDate:"N/a"
  }
]



export default function Profile({params}:{params:{id:number}}){
    
  const [render,setRender] = useState<boolean>(false);
  const [classInformation, setClassInformation] = useState<ICourseInformation[]>([]);

  const userId = params.id;
  
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`http://localhost:3000/api/profile/${userId}/get-userCourses`,{
        method:'POST',
      })

      const responseJson = await res.json();
      // const classInformation  = responseJson.data;
      console.log(responseJson.data)
      const responseData = responseJson.data;
      setClassInformation(()=>{
        const classList:ICourseInformation[] = responseData.map((item:IResponseData)=>{
          return {
              title: item?.classname,
              CRN: item?.classid,
              professor: item?.instructor,
              startDate: item?.startdate
          }
        })

        return classList
      })

      setRender(true)
    };
    
    

    fetchData();
  },[])
  
  const courseCardsList = classInformation.map((course,index)=>{
    return(
      <Card key={index} className="border border-black sm:w-[30%]">
            <CardHeader>
              <CardTitle>
                {`${course.title}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {course.CRN}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <CardContent className="flex gap-3">
                <div className="flex">
                  <Calendar />
                  <p>{course.startDate}</p>
                </div>
                <div className="flex">
                  <User />
                  <p>{course.professor}</p>
                </div>
              </CardContent>
            </CardFooter>
        </Card>
    )
  })

  

  return(
      render &&
      <div className="flex p-3 gap-3 flex-wrap">
        {courseCardsList}
      </div>
  )
}