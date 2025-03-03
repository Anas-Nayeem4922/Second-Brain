"use client"

import { TUserSignin, userSigninSchema } from "@/types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Signin() {
    const router = useRouter();
    const form = useForm<TUserSignin>({
        resolver: zodResolver(userSigninSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    async function onSubmit(values: TUserSignin) {
        const { email, password } = values;
        const response = await signIn('credentials', {
            email,
            password,
            redirect: false
        });
        if(response?.error) {
            console.log(response.error);
        }else{
            router.push("/");
        }
    }
    return <div>
        <div className="flex h-screen w-full justify-center items-center">
            <div className="flex flex-col justify-between items-center min-w-72">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">Signin</Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
}