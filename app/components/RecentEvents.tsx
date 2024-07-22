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
    blogId: string;
    title: string;
    description: string;
    author: string;
    date: Date;
    imageUrl: string;
}

const RecentActivities = async () => {
    const questionsResponse = await axios.get('http://localhost:3000/api/getquestions');
    const eventsResponse = await axios.get('http://localhost:3000/api/getevents');
    const blogsResponse = await axios.get('http://localhost:3000/api/getblogs');

    const questions: Question[] = questionsResponse.data.slice(0, 2);
    const events: Event[] = eventsResponse.data.slice(0, 2);
    const blogs: Blog[] = blogsResponse.data.slice(0, 2);

    return (
        <div>
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-green-400 mb-6">Recent Questions</h2>
                <div className="space-y-4">
                    {questions.map((question) => (
                        <div key={question.postId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <Link href={`/questions/${question.postId}`}>
                                <h3 className="text-2xl font-bold text-green-400">{question.title}</h3>
                                <p className="mt-2 text-gray-300">{question.content.slice(0, 200)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href={'/questions'} className='text-green-400 p-2'>See all...</Link>
            </div>

            <div className="mb-12">
                <h2 className="text-3xl font-bold text-blue-400 mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.eventId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <Link href={`/events/${event.eventId}`}>
                                <h3 className="text-2xl font-bold text-blue-400">{event.title}</h3>
                                <p className="mt-2 text-gray-300">{event.description}</p>
                                <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                                <p className="mt-2 text-gray-300"><strong>Location:</strong> {event.location}</p>
                                <p className="mt-2 text-gray-300"><strong>Organizer:</strong> {event.organizer}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href={'/events'} className='text-blue-400 p-2'>See all...</Link>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-purple-400 mb-6">Recent Blogs</h2>
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <div key={blog.blogId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <Link href={`/blogs/${blog.blogId}`}>
                            <h3 className="text-2xl font-bold text-purple-400">{blog.title}</h3>
                            <p className="mt-2 text-gray-300">{blog.description}</p>
                            <p className="mt-2 text-gray-300"><strong>Author:</strong> {blog.author}</p>
                            <p className="mt-2 text-gray-300"><strong>Date:</strong> {new Date(blog.date).toDateString()}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Link href={'/blogs'} className='text-purple-400 p-2'>See all...</Link>
        </div>
    );
};

export default RecentActivities;
