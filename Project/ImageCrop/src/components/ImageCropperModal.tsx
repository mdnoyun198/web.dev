'use client'

import { useState } from "react";
import Cropper from "react-easy-crop";

// Canvas Helper (নির্দিষ্ট অংশ কাটার জন্য)
async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<{ blob: Blob; url: string }> {
    const image = new window.Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx?.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
        }, "image/jpeg");
    });
}

// Props টাইপ
interface Props {
    imageSrc: string;
    onCropDone: (croppedFile: File, croppedUrl: string) => void;
    onCancel: () => void;
}

export default function ImageCropperModal({ imageSrc, onCropDone, onCancel }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const handleSave = async () => {
        if (croppedAreaPixels) {
            const { blob, url } = await getCroppedImg(imageSrc, croppedAreaPixels);
            const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });

            // Parent-এর কাছে ক্রপ করা ফাইল ও URL ফেরত পাঠাচ্ছি
            onCropDone(file, url);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 gap-4 p-4">
            {/* ক্রপার বক্স */}
            <div className="relative w-full max-w-lg aspect-square overflow-hidden rounded-lg bg-gray-900">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                />
            </div>

            {/* বাটনসমূহ */}
            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Crop & Save
                </button>
            </div>
        </div>
    );
}