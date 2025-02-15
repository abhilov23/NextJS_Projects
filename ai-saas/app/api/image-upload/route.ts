import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string; // Assuming you want to include the secure URL
}

export async function POST(request: NextRequest) {
    const { userId } = await auth(); // Await the auth function to get userId

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
      
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: `next-cloudinary-uploads` },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (!result) {
                            reject(new Error("Upload result is undefined"));
                        } else {
                            resolve(result);
                        }
                    }
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ publicId: result.public_id }, { status: 200 });
       
    } catch (error) {
        console.log("upload image failed:", error);
        return NextResponse.json({ error: "Upload Image failed" }, { status: 500 });
    }
}