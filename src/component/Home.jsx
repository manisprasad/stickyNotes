import React from 'react';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // For navigation, if needed
import '../index.css'; // Ensure Tailwind CSS is imported

const HomePage = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="flex justify-between items-center p-6 bg-white shadow-md">
                <div className="text-2xl font-bold text-gray-700">StickyNotes</div>
                <nav className="space-x-4 flex">
                    <Link to="/login">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 flex items-center">
                            <AiOutlineLogin className="mr-2" /> Sign In
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
            <main className="flex flex-1 items-center justify-center bg-gray-100">
                <div className="text-center p-6 max-w-lg">
                    <img
                        src="https://th.bing.com/th/id/OIG1.CqH3PUFQiuNArx.fRepf?pid=ImgGn" // Replace with your image URL
                        alt="Sticky Notes"
                        className="w-full h-auto rounded-lg shadow-lg mb-6"
                    />
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to StickyNotes</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Organize your thoughts, tasks, and ideas with ease. Stick them, save them, and stay organized with StickyNotes.
                    </p>
                    <Link to="/login">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600">
                            Get Started
                        </button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; 2024 StickyNotes. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
