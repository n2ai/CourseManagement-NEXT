'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValue, useForm } from "react-hook-form" 
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

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

export default function Login(){

    //1.Define your form

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    //2. Define a submit handler
    function onSubmit(values:z.infer<typeof formSchema>){
        console.log(values)
    }

    return(
        <Card className="w-[150px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Card>
    )
}