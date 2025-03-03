"use client"

import { TUserSignup, userSignupSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import axios from "axios";
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
import { BACKEND_URL } from "@/lib/url";
import { useRouter } from "next/navigation";

export default function Signup() {
  const form = useForm<TUserSignup>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  });
  const router = useRouter();
  async function onSubmit(values: TUserSignup) {
    const { username, email, password } = values;
    const response = await axios.post(`/api/user`, {
      username,
      email,
      password
    });
    const data = await response.data;
    if(data.message === "You are signed-up") {
      router.push("/signin");
    }
  }
  return <div>
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col justify-between items-center min-w-72">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField 
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  </div>
}