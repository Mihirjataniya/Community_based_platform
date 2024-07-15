import React, { useState } from 'react';

import { useEdgeStore } from '@/lib/edgestore';
import Input from './Input';
import Button from './Button';

interface ImageUploadProps {
    onUploadSuccess: (urls: { url: string; thumbnailUrl: string | null }) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);

    const uploadImage = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress: number) => {
                    setProgress(progress);
                }
            });
            const uploadedUrls = {
                url: res.url,
                thumbnailUrl: res.thumbnailUrl
            };
            onUploadSuccess(uploadedUrls);
        }
    };

    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex gap-5'>
            <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFile(e.target.files?.[0] ?? null);
                }}
            />
            <Button buttonlabel='Upload' onClick={uploadImage} />
            </div>
            <div className='h-[8px] w-full border rounded overflow-hidden'>
                <div
                    className='h-full bg-green-500 transition-all duration-200'
                    style={{
                        width: `${progress}%`
                    }}
                />
            </div>
        </div>
    );
};

export default ImageUpload;
