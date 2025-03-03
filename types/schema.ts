import { z } from "zod";

export const userSignupSchema = z.object({
    username: z.string().min(3, "Minimum 3 characters needed").max(20, "Username cannot be more than 20"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(4, "Password must contain atleast 4 characters")
});

export const userSigninSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(4, "Password must contain atleast 4 characters")
});

export type TUserSignup = z.infer<typeof userSignupSchema>
export type TUserSignin = z.infer<typeof userSigninSchema>