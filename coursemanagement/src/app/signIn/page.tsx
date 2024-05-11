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

    //1.Define your form

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    //2. Define a submit handler
    function onSubmit(values:z.infer<typeof formSchema>){
        console.log(values)
    }

    return(
        <div className="flex items-center justify-center w-screen h-screen">
            <Card className="w-[350px] h-[450px]">
                <CardTitle className="text-center mt-5">
                    Sign In
                </CardTitle>
                <CardContent>
                    <Form {...form}>
                        <form id="signIn-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            <Input placeholder="enter password" {...field}></Input>
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
                    <Button className="w-full" form="singIn-form"  type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </div>
       
    )
}