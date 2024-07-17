import Header from '@/app/components/ui/Header';
import axios from 'axios';
import Link from 'next/link';

interface Event {
    eventId: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    imageUrl: string;
}

const EventsPage = async () => {

    const response = await axios.get("http://localhost:3000/api/getevents")
    const events = response.data

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <Header headertext={"Events"} />
            <div className="max-w-6xl mx-auto py-10 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event: Event) => (
                        <Link href={`/events/${event.eventId}`}>
                            <div key={event.eventId} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                                <div className="w-full h-64 bg-gray-700 flex justify-center items-center">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-grow bg-opacity-60 bg-gray-900 backdrop-blur-md">
                                    <div>
                                        <h2 className="text-2xl font-bold text-green-400">{event.title}</h2>
                                        <p className="mt-4 text-gray-300">{event.description}</p>
                                    </div>
                                    <div className="mt-4 text-gray-400 flex flex-col gap-2 items-start">
                                        <p className='flex items-center gap-2'><span className="font-bold text-green-400">Date:</span> {new Date(event.date).toDateString()}</p>
                                        <p className='flex items-center gap-2'><span className="font-bold text-green-400">Location:</span> {event.location}</p>
                                        <p className='flex items-center gap-2'><span className="font-bold text-green-400">Organizer:</span> {event.organizer}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
