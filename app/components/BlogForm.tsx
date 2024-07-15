import React from 'react';
import TiptapEditor from '../TitptapEditor/Tiptap';
import Input from './ui/Input';
import Button from './ui/Button';

const BlogForm = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-green-400">Post a Blog</h1>
      <div className="space-y-4">
        <Input type='text' placeholder='Title' />
        <Input type='text' placeholder='Description' />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-green-400">Cover Image</h1>
        <Input type="file" />
      </div>
      <h1 className="text-xl font-semibold text-green-400">Content</h1>
      <TiptapEditor />
      <div className="text-center">
        <Button buttonlabel='Post Blog' onClick={() => {

        }} />
      </div>
    </div>
  );
};

export default BlogForm;
