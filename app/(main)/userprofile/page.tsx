'use client'
import React, { useEffect, useState } from 'react';
import { Calendar, Mail, Edit } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { GetUserData } from '@/app/actions/GetUserData';
import ImageUpload from '@/app/components/ui/ImageUpload';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Textarea from '@/app/components/ui/Textarea';
import Button from '@/app/components/ui/Button';

interface UserProfile {
  imageUrl: string | null;
  bio: string | null;
  joined: Date;
}

interface UploadedUrls {
  url: string;
  thumbnailUrl: string | null;
}

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newBio, setNewBio] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<UploadedUrls | null>(null);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false); 

  const userId = session?.user.id;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const response = await GetUserData(userId);
        if (response) {
          setUser(response);
        }
      }
    }
    fetchData();
  }, [userId, imageUrls, profileUpdated]); 
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBio(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/editprofile", {
        userId: userId,
        imageUrl: imageUrls?.url,
        bio: newBio
      });
      if (response.status === 200) {
        toast.success("Profile updated");
        setIsEditing(false);
        setProfileUpdated(!profileUpdated); 
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleUploadSuccess = (urls: UploadedUrls) => {
    setImageUrls(urls);
  };

  const handleCancel = () => {
    setNewBio(user.bio);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-10">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center max-sm:flex-col space-x-6">
            <img
              src={user.imageUrl || 'https://via.placeholder.com/150'}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-green-400">{session?.user.name}</h1>
              <p className="text-gray-400 flex items-center mt-2">
                <Mail size={16} className="mr-2" /> {session?.user.email}
              </p>
              <p className="text-gray-400 flex items-center mt-2">
                <Calendar size={16} className="mr-2" /> Joined on {new Date(user.joined).toDateString()}
              </p>
            </div>
          </div>
          <div className='flex gap-5 items-center max-sm:justify-between max-sm:mt-3 '>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className=" bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Signout
            </button>
          </div>
        </div>
        {isEditing && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-400">Edit Profile</h2>
            <div className='space-y-2 mt-3'>
              <h1 className="text-xl font-semibold text-green-400">Profile picture</h1>
              <ImageUpload onUploadSuccess={handleUploadSuccess} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Bio</label>
              <Textarea onChange={handleBioChange} />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
              <Button
                onClick={handleSave}
                buttonlabel={"save"}
              />
            </div>
          </div>
        )}
        {!isEditing && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-400">Bio</h2>
            <p className="text-gray-300 mt-4">{user.bio}</p>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default UserProfilePage;
