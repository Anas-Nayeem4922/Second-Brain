import client from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userSignupSchema } from "@/types/schema";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const parsedData = userSignupSchema.safeParse(data);
        if(parsedData.success) {
            const { email, username, password } = data;
            const hashedPassword = await bcrypt.hash(password, 3);
            const user = await client.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            });
            const { password: newUserPassword, ...rest} = user
            return NextResponse.json({
                user: rest,
                message: "You are signed-up"
            })
        } else {
            return NextResponse.json({
                error: parsedData.error.errors[0].message
            })
        }
    } catch (err) {
        return NextResponse.json({
            message: "Something went wrong"
        }, { status: 500 })
    }
}