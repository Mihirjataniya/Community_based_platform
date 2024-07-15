'use client'

import Header from '@/app/components/ui/Header';
import React, { useEffect, useState } from 'react';

interface Blog {
    id: string;
    title: string;
    description: string;
    author: string;
    date: Date;
    imageUrl: string;
}


const BlogsPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch("/api/getblogs")
            const data = await response.json()
            setBlogs(data);
        }
        fetchBlogs()
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 ">
            <Header headertext={'Blogs'}/>
            <div className="max-w-6xl mx-auto px-5 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                            <img 
                                src={blog.imageUrl} 
                                alt={blog.title} 
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-green-400">{blog.title}</h2>
                                    <p className="mt-2 text-gray-300">{blog.description}</p>
                                </div>
                                <div className="text-gray-400">
                                    <p className='mb-2'><span className="font-bold text-green-400">Author:</span> {blog.author}</p>
                                    <p><span className="font-bold text-green-400">Date:</span> {new Date(blog.date).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;

