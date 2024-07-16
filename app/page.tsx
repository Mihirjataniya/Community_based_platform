'use client'
import { Flower2, Heart, UsersRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Logo from "./components/ui/Logo";
import Button from "./components/ui/Button";

//@ts-ignore
const Feature = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
    <div className="text-green-500 my-5">
      <Icon size={40} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-200">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

//@ts-ignore
const Story = ({ text, author }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-md relative">
    <p>"{text}"</p>
    <p className="mt-2 text-gray-400">- {author}</p>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20 pointer-events-none"></div>
  </div>
);


const Card = ({ title, description, buttonText }: {
  title: string,
  description: string
  buttonText?: string | null
}) => (
  <div className="bg-gray-800 p-8 rounded-lg shadow-2xl relative mb-8 md:mb-0">
    <h2 className="text-4xl font-bold mb-6 text-green-400">{title}</h2>
    <p className="text-lg mb-6 text-gray-300">{description}</p>
    {buttonText && (
      <div className="flex justify-center">
        <button className="bg-green-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition duration-300 shadow-lg">
          {buttonText}
        </button>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20 pointer-events-none"></div>
  </div>
);

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    {
      icon: Heart,
      title: "Safe & Secure",
      description: "Experience a secure environment with our top-notch security measures and AI moderation.",
    },
    {
      icon: Flower2,
      title: "Collaborative",
      description: "Work together with students from all over and achieve your academic goals.",
    },
    {
      icon: UsersRound,
      title: "Supportive Community",
      description: "Join a community that supports and uplifts each other in every step of the way.",
    },
  ];

  const stories = [
    {
      text: "Campus Crew has transformed the way I collaborate with my peers. The AI moderation ensures a safe environment.",
      author: "Student A",
    },
    {
      text: "I have found so much help for my studies here. Sharing and getting feedback on my doubts has never been easier.",
      author: "Student B",
    },
  ];

  const cards = [
    {
      title: "Join a Community of Learners",
      description: "Connect with fellow students, share your knowledge, and get the help you need to excel in your studies.",
      buttonText: null,
    },
    {
      title: "AI-Powered Moderation",
      description: "Experience a safe and respectful online community with our advanced AI that moderates content to maintain a positive environment.",
      buttonText: "Learn More",
    },
    {
      title: "Upcoming Events",
      description: "Stay in the loop with the latest college events and activities. Don't miss out on the opportunity to participate and learn.",
      buttonText: "View Events",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <nav className="bg-gray-800 py-6 px-16 flex justify-between items-center shadow-xl max-sm:flex-col">
        <Logo />
        <div className="max-sm:mt-4 space-x-4">
          <Link href={'/signin'}>
            <Button buttonlabel='Log In' />
          </Link>
          <Link href={'/signup'}>
            <Button buttonlabel='Sign Up' />
          </Link>
        </div>
      </nav>
      <header className="bg-gray-800 text-center mt-10 py-20 px-10">
        <h1 className="text-6xl font-bold mb-6 text-gray-200">
          Welcome to <span className="text-green-500">Campus Crew</span>
        </h1>
        <p className="mt-3 text-2xl mb-6 text-gray-200">
          Empowering students to connect, share, and grow together in a supportive community.
        </p>
        <Link href={'/home'} >
          <Button buttonlabel="Get started" />
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-5 my-10 text-center space-y-12">
        <section className="w-full max-w-4xl">
          <Card title="Join a Community of Learners" description="Connect with fellow students, share your knowledge, and get the help you need to excel in your studies." />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-5">
          {cards.slice(1).map((card, index) => (
            <Card key={index} title={card.title} description={card.description} buttonText={card.buttonText} />
          ))}
        </section>
        <section className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-4xl relative">
          <h2 className="text-4xl font-bold mb-6 text-green-400">Student Stories</h2>
          <div className="space-y-4">
            {stories.map((story, index) => (
              <Story key={index} text={story.text} author={story.author} />
            ))}
          </div>
        </section>
        <section className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-4xl relative">
          <h2 className="text-4xl font-bold mb-6 text-green-400">Why Choose Campus Crew?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Feature key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20 pointer-events-none"></div>
        </section>
      </main>
      <footer className="bg-gray-800 w-full py-8 text-center text-gray-400">
        <div className="max-w-6xl mx-auto space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-green-500">Campus Crew</h3>
            <p>Your go-to community for sharing and resolving academic doubts.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-green-500 transition duration-300">About Us</a>
            <a href="#" className="hover:text-green-500 transition duration-300">Contact</a>
            <a href="#" className="hover:text-green-500 transition duration-300">Privacy Policy</a>
          </div>
          <p>&copy; 2023 Campus Crew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
