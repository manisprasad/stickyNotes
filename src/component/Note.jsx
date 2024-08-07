// src/Note.jsx
import React from 'react';
import { FaStar, FaStickyNote } from 'react-icons/fa';

const Note = ({ title, selectedGroup, content, highlightColor, favourite }) => {
    return (
        <div
            className={`p-4 m-3 w-full max-w-xs rounded-lg shadow-md ${highlightColor} transition-transform duration-200 ease-in-out transform hover:scale-105`}
            style={{ position: 'relative' }}
        >
            <FaStickyNote className="absolute top-2 right-2 text-gray-500 text-xl" />
            <div className="flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{title || 'Untitled Note'}</h4>
                </div>
                <div className="flex-grow">
                    <p className="text-sm"><strong>Group:</strong> {selectedGroup}</p>
                    <p className="mt-2 text-sm whitespace-pre-wrap break-words">{content}</p>
                </div>
                <div className="mt-2 flex items-center">
                    {favourite && <FaStar className="text-yellow-500" />}
                </div>
            </div>
        </div>
    );
};

export default Note;
