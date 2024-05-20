'use client';

import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
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
            <div className="w-full border bg-blue-400">
                Logo
            </div>
            <div className="border w-full bg-red-400">
                Profile
            </div>
            <div className="border w-full bg-green-400">
                Navbar
            </div>

            <div className="border w-full bg-yellow-400">
                Main
            </div>
        </div>
    )

}