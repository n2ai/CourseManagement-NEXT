'use client';

import { useState,useEffect } from "react";
import { Book } from "lucide-react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import { SideNav } from "@/components/ui/sidenav";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

import { Button } from "@/components/ui/button";


interface LayoutProps{
    children:React.ReactNode,
    params: {id:number}
}

export default function ProfileLayout({children,params}:LayoutProps){

    const userId:number = params.id;
    const cookies = Cookies.get();
    const jwt:string = cookies?.jwt;
    const [render,setRender] = useState<boolean>(false);
    const {push} = useRouter()

    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch('http://localhost:3000/api/profileVerify',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({userId:userId})
            })

            const status:number = res.status

            if(status === 200){
                console.log("OK")
            }else{
                
            }   
        }

        fetchData();
    })

    
    return(
        <div className="grid w-screen h-screen md:grid-cols-[20%,80%] md:grid-rows-[70px]">
            <div className="w-full border flex justify-center items-center">
                <Book />
                <h1>Course Management</h1>
            </div>
            <div className="border w-full flex items-center justify-between">
                <div></div>
                <Avatar className=" flex ">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="border w-full ">
                <SideNav id={userId}/>
            </div>

            <div className="border w-ful">
                {children}
            </div>
        </div>
    )

}