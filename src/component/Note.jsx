import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Note = ({ title, selectedGroup, content, highlightColor, onDelete, onEdit }) => {
    // Use the provided highlightColor or a default color
    const backgroundColor = highlightColor || '#fefcbf';

    return (
        <div
            className={`p-4 border-2 border-dashed border-gray-300 rounded-lg shadow-xl ${backgroundColor} transition-transform transform hover:scale-105 hover:shadow-2xl hover:rotate-1 relative`}
            style={{
                backgroundColor,
                transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
            }}
        >
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-2">{content}</p>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{selectedGroup}</span>
                <div className="flex space-x-2">
                    <button
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        onClick={onDelete}
                    >
                        <AiOutlineDelete size={18} />
                    </button>
                    <button
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={onEdit}
                    >
                        <AiOutlineEdit size={18} />
                    </button>
                </div>
            </div>
            {/* Optional Pin Icon */}
            <div
                className="absolute top-0 right-0 p-2 text-red-600"
                style={{ transform: 'rotate(-45deg)', fontSize: '1.2rem' }}
            >
                📍
            </div>
        </div>
    );
};

export default Note;
