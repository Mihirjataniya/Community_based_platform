'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import BlogForm from '@/app/components/BlogForm';
import { CircleX } from 'lucide-react';
import EventForm from '@/app/components/EventForm';
import QuestionForm from '@/app/components/QuestionForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RecentActivities from '@/app/components/RecentEvents';

const MainComponent = () => {
  const [showForm, setShowForm] = useState<string | null>(null);
  const router = useRouter()
  const { data: session, status } = useSession()
  const openForm = (formType: string) => {
    setShowForm(formType);
  };

  const closeForm = () => {
    setShowForm(null);
  };

  const exampleQuestions = [
    { id: '1', title: 'What is React?', content: 'Can someone explain what React is and how it works?' },
    { id: '2', title: 'How to use useState?', content: 'I am having trouble understanding how to use the useState hook in React.' },
  ];

  const exampleEvents = [
    { id: '1', title: 'Tech Conference 2024', description: 'An annual conference focusing on the latest in tech.', date: '2024-08-20', location: 'Tech City Convention Center', organizer: 'Tech World Inc.' },
    { id: '2', title: 'AI & Machine Learning Workshop', description: 'A workshop to dive deep into AI and machine learning.', date: '2024-09-15', location: 'Innovation Hub', organizer: 'AI Labs' },
  ];

  const exampleBlogs = [
    { id: '1', title: 'Understanding React Hooks', description: 'A deep dive into React Hooks and how to use them effectively in your projects.', author: 'John Doe', date: '2024-07-01' },
    { id: '2', title: 'CSS Grid Layout: A Complete Guide', description: 'Learn how to create complex layouts easily with CSS Grid.', author: 'Jane Smith', date: '2024-07-05' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 relative">
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 animate-fade-in max-h-screen overflow-y-auto">
            <button onClick={closeForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 focus:outline-none">
              <CircleX size={28} />
            </button>
            {showForm === 'blog' && <BlogForm />}
            {showForm === 'event' && <EventForm />}
            {showForm === 'question' && <QuestionForm />}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div onClick={() => {
            if (status === "unauthenticated") {
              router.push("/signin")
            }
            else {
              openForm('question')
            }
          }
          }

            className="cursor-pointer bg-gradient-to-r from-green-400 to-green-600 text-white font-bold p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl">Post a Question</h2>
            <p className="mt-4">Ask questions and get answers from the community.</p>
          </div>
          <div onClick={() => {
            if (status === "unauthenticated") {
              router.push("/signin")
            }
            else {
              openForm('event')
            }
          }} className="cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl">Post an Event</h2>
            <p className="mt-4">Share upcoming events with the community.</p>
          </div>
          <div onClick={() => {
            if (status === "unauthenticated") {
              router.push("/signin")
            }
            else {
              openForm('blog')
            }
          }
          } className="cursor-pointer bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl">Post a Blog</h2>
            <p className="mt-4">Share your knowledge and experiences through blogs.</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Recent Questions</h2>
          <div className="space-y-4">
            {exampleQuestions.map(question => (
              <div key={question.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-green-400">{question.title}</h3>
                <p className="mt-2 text-gray-300">{question.content}</p>
                <Link href={`/question/${question.id}`}>
                  <button className="mt-4 bg-green-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {exampleEvents.map(event => (
              <div key={event.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-blue-400">{event.title}</h3>
                <p className="mt-2 text-gray-300">{event.description}</p>
                <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                <p className="mt-2 text-gray-300"><strong>Location:</strong> {event.location}</p>
                <p className="mt-2 text-gray-300"><strong>Organizer:</strong> {event.organizer}</p>
                <Link href={`/event/${event.id}`}>
                  <button className="mt-4 bg-blue-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-purple-400 mb-6">Recent Blogs</h2>
          <div className="space-y-4">
            {exampleBlogs.map(blog => (
              <div key={blog.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-400">{blog.title}</h3>
                <p className="mt-2 text-gray-300">{blog.description}</p>
                <p className="mt-2 text-gray-300"><strong>Author:</strong> {blog.author}</p>
                <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(blog.date).toDateString()}</p>
                <Link href={`/blog/${blog.id}`}>
                  <button className="mt-4 bg-purple-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <RecentActivities /> */}
    </div>
  );
};

export default MainComponent;
