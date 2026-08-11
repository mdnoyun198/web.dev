import { Uploade, Delete, Update } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {

    try {
        const formData = await request.formData()

        const images = formData.get('image') as File;

        if (!images) {
            return NextResponse.json({ message: 'no image found' }, { status: 400 })
        }
        const uploadResult = await Uploade(images, 'profile')

        console.log(uploadResult)

        return NextResponse.json({ message: 'image uploaded successfully' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: 'Upload failed' }, { status: 500 })
    }
}


export async function DELETE() {
    try {
        await Delete('profile/wywac56ewiovmc3mmke9')

        NextResponse.json({ message: 'delete successfully' }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: 'Delete failed' }, { status: 500 })
    }
}