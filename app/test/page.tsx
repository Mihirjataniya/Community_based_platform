'use client'
import { useState } from 'react';
import TiptapEditor from '../TitptapEditor/Tiptap';
import BlogForm from '../components/BlogForm';

export default function Home() {
  const [post, setPost] = useState('');
  const [result, setResult] = useState('');
 
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: post }),
    });
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-5">
    {/* <div className="bg-gray-800 shadow-lg rounded-lg p-8  w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Content Testing</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-4 border border-gray-700 rounded-lg mb-4 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write your post here..."
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
      {result && (
        <p className={`mt-4 p-4 rounded-lg ${result === 'inappropriate' ? 'bg-red-500 text-red-100' : 'bg-green-500 text-green-100'}`}>
          Moderation Result: {result}
        </p>
      )} */}
      <div>
        <BlogForm />
      </div>
    </div>
  
  );
}
