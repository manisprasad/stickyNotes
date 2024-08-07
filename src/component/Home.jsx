import React from 'react';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // For navigation, if needed
import '../index.css'; // Ensure Tailwind CSS is imported
import image from "../assets/sticky.png"
import Logo from "../assets/download (3).svg"

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="relative z-0 flex justify-between items-center  bg-gray-800  p-4 shadow-md">
                <div className="flex-shrink-0">
                    <Link to="/">
                        <img src={Logo} alt="logo" loading="lazy"
                             className='w-[14rem] h-auto md:w-[18rem] md:h-[5rem] z-10 absolute rounded-md lg:-top-2 top-2 md:-top-3' />
                    </Link>
                </div>
                <nav className="space-x-4 flex items-center">
                    <Link to="/login">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 flex items-center">
                            <AiOutlineLogin className="mr-2" /> Log In
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 flex items-center">
                            <AiOutlineUserAdd className="mr-2" /> Sign Up
                        </button>
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center bg-richblack-700">
                <div className="text-center flex flex-col md:flex-row items-center max-w-4xl mx-4 md:mx-auto">
                    <div className='w-full md:w-2/5 mb-6 md:mb-0'>
                        <img
                            src={image}
                            alt="Sticky Notes"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <div className='w-full md:w-3/5 md:pl-6'>
                        <h1 className="text-3xl md:text-4xl gradient-shade1 font-bold mb-4 text-white">Welcome to StickyNotes</h1>
                        <p className="text-base md:text-lg text-gray-400 mb-6">
                            Organize your thoughts, tasks, and ideas with ease. Stick them, save them, and stay organized with StickyNotes.
                        </p>
                        <Link to="/login">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-white gradient-font text-center py-4">
                <p>&copy; 2024 StickyNotes. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
