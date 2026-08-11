
import { NextResponse } from "next/server";
import { request } from "node:http";
import fs from 'fs/promises'




export async function GET() {

    return new NextResponse('hello rokey')

}


export async function POST(req) {

    const text = await req.text()

    fs.appendFile('new.txt', text)

    console.log(text)

    return new NextResponse("বডি ডেটা পেয়েছি!");

}


