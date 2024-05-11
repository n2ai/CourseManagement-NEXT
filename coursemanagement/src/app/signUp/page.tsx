'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValue, useForm } from "react-hook-form" 
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    firstName: z.string({
        message:"Please enter your first name"
    }),
    lastName: z.string({
        message:"Please enter your last name"
    }),
    email: z.string().email({
        message:"Please enter on email format"
    }),
    password: z.string({
        message:"Please enter your password"
    })
})

export default function SignUp(){
 
    return(
        <div className="flex items-center justify-center w-screen h-screen">
            
        </div>
    )
}

