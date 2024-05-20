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
  } from "@/components/ui/navigation-menu"


export default function Profile({params}:{params:{id:number}}){
    
    const [render,setRender] = useState<boolean>(false);
    // const userId:number = params.id;
    // const cookies = Cookies.get();
    // const jwt:string = cookies?.jwt;
    

    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         const res = await fetch('http://localhost:3000/api/profileVerify',{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({userId:userId})
    //         })

    //         const status:number = res.status

    //         if(status === 200){
    //             setRender(true);
    //         }else{
    //             setRender(false);
    //         }
    //     }

    //     fetchData();
    // })

    if(!render) return null; 

    //Get Data

    return(
        
       <div>
        This is home
       </div>
    )
}