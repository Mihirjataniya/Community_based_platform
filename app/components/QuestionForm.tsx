import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

const QuestionForm = () => {
    const [title,setTitle] = useState<String>()
    const [description,setDescription] = useState<String>()

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold text-green-400">Post a Question</h1>
            <div className="rounded-lg space-y-6">
                <div className="space-y-4">
                    <Input placeholder='Title' />
                    <Textarea placeholder='Content' />
                    <div className='space-y-2'>
                        <h1 className="text-xl font-semibold text-green-400">Attachment</h1>
                        <Input type="file"/>
                    </div>
                </div>
                <div className="text-center">
                     <Button buttonlabel='Post Question' onClick={()=>{
                        
                    }} />
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
