import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageUpload from './ui/ImageUpload';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
interface UploadedUrls {
    url: string;
    thumbnailUrl: string | null;
}

const EventForm = () => {
    const [imageUrls, setImageUrls] = useState<UploadedUrls | null>(null);
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [organizer, setOrganizer] = useState<string>('')
    const { data: session, status } = useSession()
    const userId = session?.user.id
    const handleUploadSuccess = (urls: UploadedUrls) => {
        setImageUrls(urls);
    };

    const fields: { name: string, value: string, displayName: string }[] = [
        { name: "title", value: title, displayName: "Title" },
        { name: "description", value: description, displayName: "Description" },
        { name: "date", value: date, displayName: "Date" },
        { name: "location", value: location, displayName: "Location" },
        { name: "organizer", value: organizer, displayName: "Organizer" },
    ];

    const missingFields = fields.filter(field => !field.value.trim());
    const PostEvent = async () => {
        try {
            if (missingFields.length > 0) {
                const missingFieldNames = missingFields.map(field => field.displayName).join(", ");
                console.log(missingFieldNames);
                toast.error(`${missingFieldNames} ${missingFields.length > 1 ? "are" : "is"} required`);
            } else {
                const response = await axios.post("/api/addevent", {
                    userId: userId,
                    title: title,
                    description: description,
                    date: date,
                    location: location,
                    organizer: organizer,
                    imageUrl: imageUrls?.url
                })
                if(response.status === 200){
                    toast.success("Event added")
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="max-w-4xl mx-auto px-5 space-y-6">
            <h1 className="text-xl font-semibold text-green-400">Post an Event</h1>
            <div className=" rounded-lg  space-y-6">
                <div className="space-y-6">
                    <Input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type='text' placeholder='Title' />
                    <Textarea onChange={(e) => {
                        setDescription(e.target.value)
                    }} placeholder='Description' />
                </div>
                <div className="space-y-4">
                    <Input onChange={(e) => {
                        setDate(e.target.value)
                    }} type='datetime-local' />
                    <Input onChange={(e) => {
                        setLocation(e.target.value)
                    }} type='text' placeholder='Location' />
                    <Input onChange={(e) => {
                        setOrganizer(e.target.value)
                    }} type='text' placeholder='Organizer' />
                    <div className='space-y-2'>
                        <h1 className="text-xl font-semibold text-green-400">Event Poster</h1>
                        <ImageUpload onUploadSuccess={handleUploadSuccess} />
                    </div>
                </div>
                <div className="text-center">
                    <Button buttonlabel='Post Event' onClick={PostEvent} />
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default EventForm;
