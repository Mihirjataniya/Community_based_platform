import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Bold, Italic, Quote, Link as LinkIcon, Code, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';
import './TiptapEditor.css';

interface TiptapEditorProps {
  onContentChange: (content: string) => void; // Define the prop type
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Blockquote,
      Link,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html); 
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${
              editor.isActive('bold') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive('italic') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
            className={`${
              editor.isActive('heading', { level: 1 }) ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Heading1 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
            className={`${
              editor.isActive('heading', { level: 2 }) ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Heading2 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
            className={`${
              editor.isActive('heading', { level: 3 }) ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Heading3 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${
              editor.isActive('blockquote') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Quote size={20} />
          </button>
          <button
            onClick={() => {
              const url = prompt('Enter URL');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <LinkIcon size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${
              editor.isActive('codeBlock') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <Code size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${
              editor.isActive('bulletList') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${
              editor.isActive('orderedList') ? 'bg-green-700' : 'bg-green-500'
            } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2`}
          >
            <ListOrdered size={20} />
          </button>
        </div>
        <EditorContent placeholder="Write something amazing..." className="tiptap max-h-96 overflow-y-scroll" editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
