'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, CircleUser, MessageCircle } from 'lucide-react';
import formatDate from '@/app/actions/DateFormat';
import Header from '@/app/components/ui/Header';

const Page = () => {
  interface Question {
    postId: number;
    title: string;
    content: string;
    date: Date;
    time: string;
    username: string;
    commentsCount: number;
  }
  const [questions, setQuestions] = useState<Question[]>([])
  useEffect( ()=>{
    const getData = async () => {
      const response = await fetch('/api/getquestions')
      const data = await response.json()
      setQuestions(data)
    }
   getData()
  },[])
  console.log(questions);
  
  
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header headertext={"Community Questions"} />
      <main className="flex flex-col items-center justify-start flex-1 px-5 py-10 space-y-12">
        {/* Search Bar */}
        <div className="w-full max-w-6xl">
          <input
            type="text"
            //value={searchQuery}
            //onChange={handleSearchChange}
            placeholder="Search for doubts..."
            className="w-full p-4 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {questions.map((question) => (
              <Link key={question. postId} href={`/questions/${question. postId}`}>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-green-400 max-sm:hidden">{question.title}</h3>
                  <h3 className="hidden text-2xl font-bold text-green-400 max-sm:block max-sm:text-lg">{question.title.slice(0, 50)}</h3>
                  <p className="mt-4 text-gray-400 max-sm:hidden">{question.content.slice(0, 200)}...</p>
                  <p className="hidden mt-4 text-gray-400 max-sm:block max-sm:text-sm">{question.content.slice(0, 100)}...</p>
                  <div className="mt-4 text-gray-400 flex gap-6 items-center justify-end max-sm:gap-2">
                    <p className="flex items-center gap-2 max-sm:text-xs max-sm:text-nowrap">
                      <CircleUser size={16} /> <span className="text-green-500">{question.username}</span>
                    </p>
                    <p className="flex items-center gap-2 max-sm:text-xs max-sm:text-nowrap">
                      <CalendarCheck size={16} /> {formatDate(question.date)}
                    </p>
                    <p className="flex items-center gap-2 max-sm:text-xs max-sm:text-nowrap">
                      <MessageCircle size={16} /> {question.commentsCount}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;

