import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageUpload from './ui/ImageUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface UploadedUrls {
    url: string;
    thumbnailUrl: string | null;
}

const QuestionForm = () => {
    const [title, setTitle] = useState<String>()
    const [description, setDescription] = useState<String>()
    const [imageUrls, setImageUrls] = useState<UploadedUrls | null>(null);
    const { data: session,status} = useSession()
 
    const userId = session?.user.id
    const handleUploadSuccess = (urls: UploadedUrls) => {
        setImageUrls(urls);
    };
    const PostQuestions = async () => {
        try {
           const response = await axios.post('/api/addquestion',{
                userId : userId,
                title: title,
                content : description,
                imageUrl : imageUrls?.url
           })  
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold text-green-400">Post a Question</h1>
            <div className="rounded-lg space-y-6">
                <div className="space-y-4">
                    <Input placeholder='Title' onChange={(e)=>{
                        setTitle(e.target.value)
                    }}/>
                    <Textarea placeholder='Content' onChange={(e)=>{
                        setDescription(e.target.value)
                    }} />
                    <div className='space-y-2'>
                        <h1 className="text-xl font-semibold text-green-400">Attachment</h1>
                        <ImageUpload onUploadSuccess={handleUploadSuccess} />
                    </div>
                </div>
                <div className="text-center">
                    <Button buttonlabel='Post Question' onClick={PostQuestions}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
