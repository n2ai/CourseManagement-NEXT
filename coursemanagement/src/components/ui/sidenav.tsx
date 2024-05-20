'use client';
import { Button } from "./button";
import { LayoutDashboard,Book,Calendar, Settings } from "lucide-react";
export function SideNav (){
    return(
        <div className="flex flex-wrap flex-col gap-4 mt-3">
            <Button className="h-[50px] border flex hover:text-white text-black bg-white ml-2 mr-2">
                <LayoutDashboard />Dashboard
            </Button>
            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Book/>Courses
            </Button>
            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Calendar/>Calendar
            </Button>
            <Button className="h-[50px] border hover:text-white text-black bg-white ml-2 mr-2">
                <Settings/>Settings
            </Button>
        </div>
    )
}