"use client"

import { Fetchevent } from '@/app/actions/FetchEvent';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const EventPage = () => {

  interface Event {
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    imageUrl: string;
  }

  const route = usePathname()
  const eventId = route.split("/")[2];
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    const FetchEvent = async () => {
      const data = await Fetchevent(eventId)
      if (data) {
        setEvent(data)
      }
    }
    FetchEvent()
  }, [])


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-10">
      <div className="max-w-4xl mx-auto px-5">
        {event &&
          <>
            <div className='flex items-center justify-center w-full my-5 '>
              <img src={event.imageUrl} className='h-[400px] w-auto object-contain items-center border-4 p-2' />
            </div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{event.description}</p>
            <div className="text-lg text-gray-400 mb-4 space-y-2">
              <p>
                <span className="font-bold text-green-400">Date:</span> {new Date(event.date).toDateString()}
              </p>
              <p>
                <span className="font-bold text-green-400">Location:</span> {event.location}
              </p>
              <p>
                <span className="font-bold text-green-400">Organizer:</span> {event.organizer}
              </p>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default EventPage;
