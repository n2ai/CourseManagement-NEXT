'use client';
import { Button } from "./button";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { LayoutDashboard,Book,Calendar, Settings,Captions } from "lucide-react";

interface ISideNavProps{
    id:string
}

export function SideNav ({props}:{props:ISideNavProps}){

    const pathname = usePathname()
    console.log(pathname)

    return(
        <div className="flex flex-wrap flex-col gap-4 mt-3">
            <Link href={'/'}>
                <Button className="h-[50px] border flex hover:text-white text-black bg-white ml-2 mr-2">
                    <LayoutDashboard />Home
                </Button>
            </Link>
            
            <Link href={'./courses'}>
                <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                    <Book/>Courses
                </Button>
            </Link>
            
            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Calendar/>Calendar
            </Button>
            
            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Captions />Grades
            </Button>

            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Settings/>Settings
            </Button>
        </div>
    )
}