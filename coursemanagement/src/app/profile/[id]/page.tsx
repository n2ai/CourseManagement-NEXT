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

interface ICourseCards{
  title:string,
  CRN:string,
  professor:string,
  descriptions:string,
  schedule:string,
};

const courseCards:ICourseCards[] = [
  {title:'Introduction to Computer Science I',
    CRN: 'CS1301',
    professor:'Yilmaz Emre',
    descriptions:'This is CS I class',
    schedule:'N/A'
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    descriptions:'This is CS II class',
    schedule:'N/A'
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    descriptions:'This is CS II class',
    schedule:'N/A'
  },{
    title:'Introduction to Computer Science II',
    CRN: 'CS1302',
    professor:'Yilmaz Emre',
    descriptions:'This is CS II class',
    schedule:'N/A'
  }
]

export default function Profile({params}:{params:{id:number}}){
    
  const [render,setRender] = useState<boolean>(true);
  const [classInformation, setClassInformation];
  const userId = params.id;
  
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`http://localhost:3000/api/profile/${userId}/get-userCourses`,{
        method:'GET',
      })

      const responseJson = await res.json();
      const classInformation  = responseJson.data;

    };
    
    

    fetchData();
  })
  
  const courseCardsList = courseCards.map((course,index)=>{
    return(
      
      <Card key={index} className="border border-black sm:w-[30%]">
          <CardHeader>
            <CardTitle>
              {`${course.title}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {course.descriptions}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardContent className="flex gap-3">
              <div className="flex">
                <Calendar />
                <p>{course.schedule}</p>
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