import React from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

const EventForm = () => {
    return (
        <div className="max-w-4xl mx-auto px-5 space-y-6">
            <h1 className="text-xl font-semibold text-green-400">Post an Event</h1>
            <div className=" rounded-lg  space-y-6">
                <div className="space-y-6">
                    <Input type='text' placeholder='Title' />
                    <Textarea placeholder='Description'/>
                </div>
                <div className="space-y-4">
                    <Input type='datetime-local' />
                    <Input type='text' placeholder='Location' />
                    <Input type='text' placeholder='Organizer' />
                    <div className='space-y-2'>
                        <h1 className="text-xl font-semibold text-green-400">Event Poster</h1>
                        <Input type="file"/>
                    </div>

                </div>
                <div className="text-center">
                    <Button buttonlabel='Post Event' onClick={()=>{
                        
                    }} />
                </div>
            </div>
        </div>
    );
};

export default EventForm;
