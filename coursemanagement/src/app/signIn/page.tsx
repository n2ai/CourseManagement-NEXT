'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, useForm } from "react-hook-form" ;
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  email: z.string().min(2,{
    message:"Must be more than 2 characters"
  }).max(50,{
    message:"Must less than 50 characters"
  }).email({
    message:"Must be in email format"
  }),
  password:z.string({
    message:"Incorrect format"
  })
})

export default function SignIn(){

    //Contents
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    //1.Define your form

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    //2. Define a submit handler
    async function onSubmit(values:z.infer<typeof formSchema>){
        const res = await fetch('http://localhost:3000/api/authentication',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })

        const responseJSON = await res.json();
        const jwt:string = responseJSON.jwt;

        Cookies.set('jwt',jwt);
        
    }



    return(
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="w-[350px] h-[350px]">
                <CardTitle className="text-center mt-5">
                    Sign In
                </CardTitle>
                <CardContent>
                    <Form {...form}>
                        <form id="signIn-form" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} 
                                name="email"
                                defaultValue= {email}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input onChangeCapture={e => setEmail(e.currentTarget.value)} placeholder="@gmail.com" {...field} ></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            <FormField control={form.control} 
                                name="password"
                                defaultValue={password}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input onChangeCapture={e => setPassword(e.currentTarget.value)} type="password" placeholder="enter password" {...field}></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                
                            </FormField>
                            
                        </form>
                        <Link className="underline right" href="/signUp">Create an Account</Link>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" form="signIn-form"  type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </div>
       
    )
}