import Link from 'next/link';
import axios from 'axios';

interface Question {
    postId: number;
    title: string;
    content: string;
    date: Date;
    time: string;
    username: string;
    commentsCount: number;
}

interface Event {
    eventId: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: string;
    imageUrl: string;
}

interface Blog {
    id: string;
    title: string;
    description: string;
    author: string;
    date: Date;
    imageUrl: string;
}

const RecentActivities = async () => {


    const Questionsresponse = await axios.get('http://localhost:3000/api/getquestions');
    const questions = Questionsresponse.data.slice(0,2)
    const Eventsresponse = await axios.get('http://localhost:3000/api/getevents');
    const events = Eventsresponse.data.slice(0,2)
    const Blogsresponse = await axios.get('http://localhost:3000/api/getblogs');
    const blogs = Blogsresponse.data.slice(0,2)


    return (
        <div>
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-green-400 mb-6">Recent Questions</h2>
                <div className="space-y-4">
                    {questions.map((question: Question) => (
                        <div key={question.postId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-green-400">{question.title}</h3>
                            <p className="mt-2 text-gray-300">{question.content}</p>
                            <Link href={`/question/${question.postId}`}>
                                <button className="mt-4 bg-green-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-3xl font-bold text-blue-400 mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                    {events.map((event: Event) => (
                        <div key={event.eventId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-blue-400">{event.title}</h3>
                            <p className="mt-2 text-gray-300">{event.description}</p>
                            <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                            <p className="mt-2 text-gray-300"><strong>Location:</strong> {event.location}</p>
                            <p className="mt-2 text-gray-300"><strong>Organizer:</strong> {event.organizer}</p>
                            <Link href={`/event/${event.eventId}`}>
                                <button className="mt-4 bg-blue-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-purple-400 mb-6">Recent Blogs</h2>
                <div className="space-y-4">
                    {blogs.map((blog: Blog) => (
                        <div key={blog.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-purple-400">{blog.title}</h3>
                            <p className="mt-2 text-gray-300">{blog.description}</p>
                            <p className="mt-2 text-gray-300"><strong>Author:</strong> {blog.author}</p>
                            <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(blog.date).toDateString()}</p>
                            <Link href={`/blog/${blog.id}`}>
                                <button className="mt-4 bg-purple-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivities;
