// src/AllNotes.jsx
import React, { useEffect, useState } from 'react';
import Note from './Note.jsx';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                const response = await fetch('https://notesapi-production-c782.up.railway.app/notes/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();
                setNotes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note) => (
                <Note
                    key={note.id}
                   title={note.title}
                    selectedGroup={note.groupName}
                    content={note.content}
                    user="" // Assuming user is not part of the note data
                    highlightColor={note.color}
                />
            ))}
        </div>
    );
};

export default AllNotes;
