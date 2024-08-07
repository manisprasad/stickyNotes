import React, { useEffect, useState } from 'react';
import Note from './Note.jsx';
import NoStickyNotes from './NoStickyNotes.jsx';
import Loading from "./loading/Loading.jsx";
import toast from "react-hot-toast";

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [updating, setUpdating] = useState(false);
    const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-green-400'];

    useEffect(() => {
        // Fetch groups from the server
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://notesapi-production-c782.up.railway.app/user/user_details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const groupNames = data.stickyNoteGroupNames;
                    setGroups(groupNames);
                } else {
                    console.error('Failed to fetch groups:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                let response;

                if (selectedGroup) {
                    response = await fetch(`https://notesapi-production-c782.up.railway.app/notes/filterByGroupName/${selectedGroup}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                } else if (selectedColor) {
                    response = await fetch(`https://notesapi-production-c782.up.railway.app/notes/filterByColor/${selectedColor}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    response = await fetch('https://notesapi-production-c782.up.railway.app/notes/all', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                }

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
    }, [selectedGroup, selectedColor]);

    const handleDelete = async (id) => {
        const isConfirmed =  window.confirm("Are you sure you want to delete this note?");
        if (!isConfirmed) {
            return;
        }
        try {
            setDeleting(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`https://notesapi-production-c782.up.railway.app/notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                toast.error("failed to delete")
                throw new Error('Failed to delete note');

            }else{
                toast.success("sucessfully deleted");
            }

            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setUpdatedTitle(note.title);
        setUpdatedContent(note.content);
    };

    const handleUpdate = async () => {
        if (!editingNote) return;

        try {
            setUpdating(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`https://notesapi-production-c782.up.railway.app/notes/update/${editingNote.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    content: updatedContent,
                    color: editingNote.color,
                    groupName: editingNote.groupName,
                    favourite: editingNote.favourite,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update note');
            }else{
                toast.success("Your Note has been updated.");
                location.reload();
            }

            const updatedNote = await response.json();
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                )
            );
            setEditingNote(null);
        } catch (err) {
            throw new Error("Failed to update note");
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <Loading />;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4">
            {editingNote && (
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Edit Note</h2>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        placeholder="Title"
                        className="block w-full p-2 mb-2 border rounded"
                    />
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        placeholder="Content"
                        className="block w-full p-2 mb-2 border rounded"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleUpdate}
                        disabled={updating}
                    >
                        {updating ? 'Updating...' : 'Save'}
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => setEditingNote(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}
            <div className="flex gap-4 mb-4">
                <select
                    className="form-select bg-gray-800 text-white border border-gray-600 rounded-md p-2"
                    onChange={(e) => {
                        setSelectedGroup(e.target.value);
                        setSelectedColor('');
                    }}
                    value={selectedGroup}
                >
                    <option value="">Select Group</option>
                    {groups.map((group, index) => (
                        <option key={index} value={group}>
                            {group}
                        </option>
                    ))}
                </select>
                <select
                    className="form-select bg-gray-800 text-white border border-gray-600 rounded-md p-2"
                    onChange={(e) => {
                        setSelectedColor(e.target.value);
                        setSelectedGroup('');
                    }}
                    value={selectedColor}
                >
                    <option value="">Select Color</option>
                    {colors.map((color, index) => (
                        <option key={index} value={color}>
                            {color.replace('bg-', '').replace('-400', '')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {notes.length === 0 ? (
                    <NoStickyNotes />
                ) : (
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            title={note.title}
                            selectedGroup={note.groupName}
                            content={note.content}
                            highlightColor={note.color}
                            favourite={note.favourite}
                            onDelete={() => handleDelete(note.id)}
                            onEdit={() => handleEdit(note)}
                        />
                    ))
                )}
            </div>
            {deleting && <Loading />}
        </div>
    );
};

export default AllNotes;
