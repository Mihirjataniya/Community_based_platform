import React, { useState } from 'react';
import TiptapEditor from '../(main)/blogs/TitptapEditor/Tiptap';
import Input from './ui/Input';
import Button from './ui/Button';
import ImageUpload from './ui/ImageUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface UploadedUrls {
  url: string;
  thumbnailUrl: string | null;
}

const BlogForm = () => {
  const [imageUrls, setImageUrls] = useState<UploadedUrls | null>(null);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [editorData, setEditorData] = useState<string>('');
  const handleUploadSuccess = (urls: UploadedUrls) => {
    setImageUrls(urls);
  };

  const handleContentChange = (content: string) => {
    setEditorData(content);
  };
  const { data: session, status } = useSession()
  const userId = session?.user.id

  const fields: { name: string, value: string, displayName: string }[] = [
    { name: "title", value: title, displayName: "Title" },
    { name: "description", value: description, displayName: "Description" },
    { name: "editorData", value: editorData, displayName: "Content" },
  ];
  const missingFields = fields.filter(field => !field.value.trim());
  const PostBlog = async () => {
    try {
      if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map(field => field.displayName).join(", ");
        console.log(missingFieldNames);
        toast.error(`${missingFieldNames} ${missingFields.length > 1 ? "are" : "is"} required`);
    } else {
      const response = await axios.post("/api/addblog", {
        title: title,
        description: description,
        content: editorData,
        authorId: userId,
        imageUrl: imageUrls?.url,
      })
      if(response.status === 200){
        toast.success("Blog posted")
      }
    }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-green-400">Post a Blog</h1>
      <div className="space-y-4">
        <Input type='text' onChange={(e) => {
          setTitle(e.target.value)
        }} placeholder='Title' />
        <Input onChange={(e) => {
          setDescription(e.target.value)
        }} type='text' placeholder='Description' />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-green-400">Cover Image</h1>
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
      </div>
      <h1 className="text-xl font-semibold text-green-400">Content</h1>
      <TiptapEditor onContentChange={handleContentChange} />
      <div className="text-center">
        <Button buttonlabel='Post Blog' onClick={PostBlog} />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default BlogForm;
