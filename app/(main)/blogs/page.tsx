import Header from '@/app/components/ui/Header';
import axios from 'axios';
import Link from 'next/link';

interface Blog {
    blogId: string;
    title: string;
    description: string;
    author: string;
    date: Date;
    imageUrl: string;
}

const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;
};

const BlogsPage = async () => {
    const response = await axios.get("http://localhost:3000/api/getblogs");
    const blogs = await response.data;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <Header headertext={'Blogs'} />
            <div className="max-w-6xl mx-auto px-5 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {blogs.map((blog: Blog) => (
                        <Link href={`/blogs/${blog.blogId}`} key={blog.blogId}>
                            <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105" style={{ minHeight: '300px' }}>
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-between">
                                    <div className="flex-grow mb-2">
                                        <h2 className="text-2xl max-sm:text-lg font-bold text-green-400">{blog.title}</h2>
                                        <p className="mt-2 max-sm:text-sm text-gray-300">
                                            {truncateDescription(blog.description, 200)}
                                        </p>
                                    </div>
                                    <div className="text-gray-400">
                                        <p className='mb-1'><span className="font-bold text-green-400">Author:</span> {blog.author}</p>
                                        <p><span className="font-bold text-green-400">Date:</span> {new Date(blog.date).toDateString()}</p>
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

export default BlogsPage;
