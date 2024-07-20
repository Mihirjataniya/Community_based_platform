import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageUpload from './ui/ImageUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';

interface UploadedUrls {
    url: string;
    thumbnailUrl: string | null;
}

const QuestionForm = () => {
    const [title, setTitle] = useState<String>()
    const [description, setDescription] = useState<String>()
    const [imageUrls, setImageUrls] = useState<UploadedUrls | null>(null);
    const { data: session, status } = useSession()

    const userId = session?.user.id
    const handleUploadSuccess = (urls: UploadedUrls) => {
        setImageUrls(urls);
    };
    const PostQuestions = async () => {
        try {
            if (title === undefined || description === undefined) {
                toast.error(`${title == undefined ? "Title is required" : "Description is required"}`)
            }else{
                const response = await axios.post('/api/addquestion', {
                    userId: userId,
                    title: title,
                    content: description,
                    imageUrl: imageUrls?.url
                })
                if (response.status == 200) {
                    toast.success("Question Posted")
                }
            }
        } catch (error: any) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold text-green-400">Post a Question</h1>
            <div className="rounded-lg space-y-6">
                <div className="space-y-4">
                    <Input placeholder='Title' onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                    <Textarea placeholder='Content' onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <div className='space-y-2'>
                        <h1 className="text-xl font-semibold text-green-400">Attachment</h1>
                        <ImageUpload onUploadSuccess={handleUploadSuccess} />
                    </div>
                </div>
                <div className="text-center">
                    <Button buttonlabel='Post Question' onClick={PostQuestions} />
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default QuestionForm;
