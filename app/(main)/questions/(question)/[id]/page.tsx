'use client'

import React, { useEffect, useState } from 'react';
import { CalendarCheck, CircleUser, Heart, HeartOff } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FetchQuestion } from '@/app/actions/FetchQuestion';
import formatDate from '@/app/actions/DateFormat';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Textarea from '@/app/components/ui/Textarea';
import Button from '@/app/components/ui/Button';
import toast, { Toaster } from 'react-hot-toast';

interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        username: string;
    };
    likeCount: number;
}

interface Question {
    title: string;
    content: string;
    createdAt: Date;
    username: string;
    comments: Comment[];
    imageUrl : string | null
}

const QuestionPage = () => {
    const route = usePathname();
    const [question, setQuestion] = useState<Question>();
    const [expandedComments, setExpandedComments] = useState<string[]>([]);

    const [newComment, setNewComment] = useState<string>('');
    const { data: session, status } = useSession()
    const userId = session?.user.id
    const postId = route.split("/")[2];
    useEffect(() => {
        const fetchData = async () => {
            const response = await FetchQuestion(postId);
            if (response) {
                setQuestion(response);

            }
        };
        fetchData();
    }, [route, newComment]);

    const toggleComment = (id: string) => {
        setExpandedComments((prev) =>
            prev.includes(id) ? prev.filter((commentId) => commentId !== id) : [...prev, id]
        );
    };

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            const response = await axios.post("/api/addcomment", {
                userId: userId,
                postId: postId,
                content: newComment
            })
            if(response.status === 200){
                toast.success("Comment added")
            }else{
                toast.error("Something went wrong")
            }
            setNewComment('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <div className="max-w-4xl mx-auto py-10 px-5">
                {question && (
                    <>
                        <h1 className="text-3xl font-bold text-green-400 mb-6">{question.title}</h1>
                        <div className="text-gray-400 mb-4">
                            <p className="flex items-center gap-2">
                                <CircleUser size={16} /> <span className="text-green-500">{question.username}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <CalendarCheck size={16} /> {formatDate(question.createdAt)}
                            </p>
                        </div>
                        <p className="text-lg text-gray-300 mb-8">{question.content}</p>
                        {question.imageUrl && <img src={question.imageUrl}/>}
                        <div className="w-full bg-gray-800 p-6 rounded-lg my-5 shadow-lg mt-6">
                            <h2 className="text-2xl font-bold text-green-400 mb-4">Add a Comment</h2>
                            <div className="relative">
                                <div className="flex-1">
                                    <Textarea
                                        placeholder="Write your comment here..."
                                        onChange={(e) => setNewComment(e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className='absolute top-1/2 right-4 transform -translate-y-1/2'>
                                    <Button
                                        onClick={handleAddComment}
                                        buttonlabel='Add'
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-green-400 mb-4">Comments</h2>
                        <div className="space-y-4">
                            {question.comments.map((comment) => {
                                const isExpanded = expandedComments.includes(comment.id);
                                return (
                                    <div key={comment.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                        <div className="text-gray-400 mb-2">
                                            <p className="flex items-center gap-2">
                                                <CircleUser size={16} /> <span className="text-green-500">{comment.user.username}</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <CalendarCheck size={16} /> {formatDate(comment.createdAt)}
                                            </p>
                                        </div>
                                        <p  style={{ whiteSpace: 'pre-wrap' }} className="text-gray-300">
                                            {isExpanded ? comment.content : `${comment.content.slice(0, 150)}...`}
                                            {comment.content.length > 100 && (
                                                <button
                                                    onClick={() => toggleComment(comment.id)}
                                                    className="text-green-400 ml-2 focus:outline-none"
                                                >
                                                    {isExpanded ? 'Show Less' : 'Read More'}
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <Toaster position="top-right" />.
        </div>
    );
};

export default QuestionPage;
