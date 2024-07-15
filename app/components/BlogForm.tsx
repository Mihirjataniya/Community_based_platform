import React from 'react';
import TiptapEditor from '../TitptapEditor/Tiptap';

const BlogForm = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-green-400">Cover Image</h1>
        <input
          type="file"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <h1 className="text-xl font-semibold text-green-400">Content</h1>
      <TiptapEditor />
      <div className="text-center">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300">
          Post
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
