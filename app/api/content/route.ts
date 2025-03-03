import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const content = await client.content.create({
        data: {
            title: data.title,
            description: data.description,
            link: data.link,
            type: data.type,
            userId: 1
        }
    })
    return NextResponse.json({
        id: content.id
    })
}