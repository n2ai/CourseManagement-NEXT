'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValue, useForm } from "react-hook-form" 
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreateUser } from "@/helpers/actions"

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
 
    //1.Define your form

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    //2. Define a submit handler
    async function onSubmit(values:z.infer<typeof formSchema>){
        //send data to routes handler
        const res = await fetch('http://localhost:3000/api/create-user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })
        
        console.log( await res.json())
    }

    return(
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="w-[350px] h-[450px]">
                <CardTitle className="text-center mt-5">
                    Sign Up
                </CardTitle>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="signUp-form" >
                            <FormField control={form.control} 
                                name="firstName"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field}></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            <FormField control={form.control} 
                                name="lastName"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field}></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            <FormField control={form.control} 
                                name="email"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="@gmail.com" {...field}></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            <FormField control={form.control} 
                                name="password"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="enter password" {...field}></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            
                        </form>
                        <Link className="underline right" href="/signIn">Already has an Account?</Link>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" form="signUp-form"  type="submit">Create an account</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

