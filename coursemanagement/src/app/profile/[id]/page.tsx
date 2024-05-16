'use client';

import { useState,useEffect } from "react";
import Cookies from "js-cookie";

export default function Profile({params,searchParams}){
    
    const [render,setRender] = useState<boolean>(false);
    const userId:number = params.id;
    const cookies = Cookies.get()
    const jwt:string = cookies.jwt
    console.log(jwt)

    // useEffect(()=>{
    //     const res = await fetch('http://localhost:3000/api/authentication',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify()
    //     })
    // })


    return(
        <div>
            This is Profile Page 
        </div>
    )
}