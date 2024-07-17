'use client'

import React, { useEffect, useState } from 'react';
import { CalendarCheck, CircleUser } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FetchBlogs } from '@/app/actions/FetchBlog';
import './blogstyling.css'

const BlogPage = () => {
    interface Blog {
        title: string;
        content: string;
        description: string;
        authorname: string;
        createdAt: Date;
        imageUrl: string;
    }
    const route = usePathname()
    const blogId = route.split("/")[2];
    const [blog, setBlog] = useState<Blog>()
    useEffect(() => {
        const fetch = async () => {
            const data = await FetchBlogs(blogId)
            if (data) {
                setBlog(data)
            }
        }
        fetch()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 py-10">
            <div className="max-w-4xl mx-auto px-5 blog-page">
                {blog && <>
                    <h1 className="text-4xl font-bold text-green-400 mb-6">{blog.title}</h1>
                    <p className='text-gray-500 mb-4'>{blog.description}</p>
                    <div className="mb-4 text-gray-400 flex items-center gap-4">
                        <p className="flex items-center gap-2">
                            <CircleUser size={20} /> <span className="text-green-500">{blog.authorname}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarCheck size={20} /> {new Date(blog.createdAt).toDateString()}
                        </p>
                    </div>
                    <img src={blog.imageUrl} alt={blog.title} className="mb-6" />
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div
                            className="prose prose-lg text-gray-300"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default BlogPage;
