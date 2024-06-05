'use client';

import { useState,useEffect, Dispatch, SetStateAction } from "react";
import { Book, ShoppingCart } from "lucide-react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import { SideNav } from "@/components/ui/sidenav";
import { createContext } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { json } from "stream/consumers";
import { TableBody } from "@/components/ui/table";

interface LayoutProps{
    children:React.ReactNode,
    params: {id:number}
}

export interface ICartItems{
    classid:string,
    classname:string
}

export const PageContext = createContext<Dispatch<SetStateAction<ICartItems[]>>>(()=>{});

export default function ProfileLayout({children,params}:LayoutProps){

    const userId:number = params.id;
    const cookies = Cookies.get();
    // const jwt:string = cookies?.jwt;
    // const [render,setRender] = useState<boolean>(false);
    const [cart, setCart] = useState<ICartItems[]>([]);
    const {push} = useRouter();

    const cartItemArray = cart.map((item, index)=>{
        return(
            <div key={index} className="grid grid-cols-3 gap-1">
                <div>{item.classid}</div>
                <div>{item.classname}</div>
                <Button type="button" onClick={()=>removeItemFromCart(item)}>Remove Item</Button>
            </div>
        )
    })

    //Will Work on this feature
    const removeItemFromCart = (removedItem:ICartItems)=>{
        setCart((prev:ICartItems[])=>{
            const items = prev.filter(item=>item.classid !== removedItem.classid);
            return items;
        })
    }

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
    
    const handleRegisterCart = async ()=>{
        const res = await fetch('http://localhost:3000/api/enroll-courses',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userId:userId,courses:cart})
        })

        const responseJSON = await res.json();
        console.log(responseJSON)
        if(res.status === 200){
            
            if(responseJSON?.message === 'Class Already Taken'){
                alert(`The user already take class ${responseJSON?.data}`);
            }else{
                alert(`Classes are taken successfully`);

            }

        }else if(res.status === 400){
            alert(`Cannot take the class ${responseJSON?.classid}, must finish class ${responseJSON?.neededclassid}`);
        }else if(res.status === 500){
            alert(`Server error happened`);
        }
    }
  
    
    console.log(cart)

    return(
        <div className="grid w-screen h-screen md:grid-cols-[20%,80%] md:grid-rows-[70px]">
            <div className="w-full border flex justify-center items-center">
                <Book />
                <h1>Course Management</h1>
            </div>
            <div className="border w-full flex items-center justify-between">
                <Popover>
                    <PopoverTrigger>
                        
                        <ShoppingCart/>
                        
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col w-auto">
                        
                        {cart.length === 0 ? (<p>There is no item in cart</p>): (
                            <div className="">
                                {cartItemArray}
                                <Button onClick={handleRegisterCart} type="button">Enroll</Button>
                            </div>
                        )}
                        
                    </PopoverContent>
                </Popover>
                <Avatar className=" flex ">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="border w-full ">
                <SideNav id={userId}/>
            </div>

            <div className="border w-ful">
                <PageContext.Provider value={setCart}>
                    {children}
                </PageContext.Provider>
            </div>
        </div>
    )

}
