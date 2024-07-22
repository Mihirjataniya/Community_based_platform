import React from 'react';
import FormInputs from '@/app/components/FormInputs';
import RecentActivities from '@/app/components/RecentEvents'; // Import if you need it

const MainComponent = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 relative">
      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FormInputs
            formType="question"
            title="Post a Question"
            description="Ask questions and get answers from the community."
            gradientFrom="green-400"
            gradientTo="green-600"
          />
          <FormInputs
            formType="event"
            title="Post an Event"
            description="Share upcoming events with the community."
            gradientFrom="blue-400"
            gradientTo="blue-600"
          />
          <FormInputs
            formType="blog"
            title="Post a Blog"
            description="Share your knowledge and experiences through blogs."
            gradientFrom="purple-400"
            gradientTo="purple-600"
          />
        </div>
        <RecentActivities />
      </div>
    </div>
  );
};

export default MainComponent;
