'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/app/components/BlogForm';
import EventForm from '@/app/components/EventForm';
import QuestionForm from '@/app/components/QuestionForm';
import { CircleX } from 'lucide-react';

interface FormInputProps {
  formType: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const FormInputs: React.FC<FormInputProps> = ({ formType, title, description, gradientFrom, gradientTo }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else {
      setShowForm(true);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`cursor-pointer bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white font-bold p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105`}
      >
        <h2 className="text-3xl">{title}</h2>
        <p className="mt-4">{description}</p>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 animate-fade-in max-h-screen overflow-y-auto">
            <button onClick={closeForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 focus:outline-none">
              <CircleX size={28} />
            </button>
            {formType === 'blog' && <BlogForm />}
            {formType === 'event' && <EventForm />}
            {formType === 'question' && <QuestionForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default FormInputs;
