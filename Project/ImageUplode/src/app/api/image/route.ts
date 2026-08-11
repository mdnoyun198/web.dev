import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from "path";

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
        return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const imgPath = path.join(process.cwd(), 'src', 'image', image.name);


    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    await fs.writeFile(imgPath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });
}