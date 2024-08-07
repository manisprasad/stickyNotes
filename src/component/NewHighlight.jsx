import React, { useRef, useState, useEffect } from 'react';
import Note from './Note.jsx';
import { IoIosAddCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';
import Loading from "./loading/Loading.jsx";

const NewHighlight = () => {
    const [selectedGroup, setSelectedGroup] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [highlightColor, setHighlightColor] = useState('');
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [notes, setNotes] = useState([]);
    const [favourite, setFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchingGroups, setFetchingGroups] = useState(false);
    const [addingNote, setAddingNote] = useState(false);

    const [isActive, setIsActive] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-purple-400', 'bg-green-400'];
    const ref = useRef(null);

    useEffect(() => {
        // Fetch groups from the server
        const fetchGroups = async () => {
            try {
                setFetchingGroups(true);
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
                    console.log(groupNames);
                } else {
                    toast.error('Failed to fetch groups:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            } finally {
                setFetchingGroups(false);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (dragging) {
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                });
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, offset]);

    const handleMouseDown = (e) => {
        // Check if the drag started from the header area
        if (e.target.classList.contains('draggable-header')) {
            setDragging(true);
            setOffset({
                x: e.clientX - ref.current.getBoundingClientRect().left,
                y: e.clientY - ref.current.getBoundingClientRect().top,
            });
        }
    };

    const handleAddGroup = () => {
        if (newGroupName && !groups.includes(newGroupName)) {
            setGroups([...groups, newGroupName]);
            setNewGroupName('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !highlightColor) {
            toast.error('Please fill in all fields and select a highlight color.');
            return;
        }

        const newNote = {
            title,
            content,
            color: highlightColor,
            groupName: selectedGroup,
            favourite,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };


        const token = localStorage.getItem('token');


        try {
            setAddingNote(true);
            const response = await fetch('https://notesapi-production-c782.up.railway.app/notes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newNote),
            });

            if (response.ok) {
                // Add the new note to the notes list locally if the request is successful
                setNotes([...notes, newNote]);
                console.log('Note added successfully:', newNote);
                toast.success('Note added successfully!');
                resetForm();
                location.reload();
            } else {
                console.error('Failed to add note:', response.statusText);
                toast.error('Failed to add note. Please try again.');
            }
        } catch (error) {
            console.error('Error adding note:', error);
            toast.error('An error occurred while adding the note. Please try again.');
        } finally {
            setAddingNote(false);
        }
    };

    const resetForm = () => {
        setSelectedGroup('');
        setTitle('');
        setContent('');
        setHighlightColor('');
        setFavourite(false);
    };

    const handleCancel = () => {
        resetForm();
        setIsActive(false);
    };

    return (
        <div
            ref={ref}
            className={`fixed w-full max-w-sm z-50 transform ${position.x}px ${position.y}px`}
            style={{ top: position.y, left: position.x, position: 'absolute' }}
        >
            <div
                className="draggable-header bg-gray-200 p-2 cursor-move rounded-md shadow-md cursor-pointer"
                onMouseDown={handleMouseDown}
            >
                <h2 className="text-xl font-semibold mb-4 text-center">New Note</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className={`p-4 bg-gray-100 rounded-lg shadow-md flex flex-col ${isActive && 'hidden'}`}
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-sm text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Group</label>
                    {fetchingGroups ? (
                        <Loading />
                    ) : (
                        <div className="flex items-center">
                            <select
                                value={selectedGroup}
                                required={true}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="flex-1 p-1.5 border border-gray-300 rounded-sm text-sm"
                            >
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={handleAddGroup}
                                className="ml-2 p-1.5 bg-indigo-600 text-white rounded-sm text-sm hover:bg-indigo-700"
                            >
                                Add
                            </button>
                        </div>
                    )}
                    <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="New group name"
                        className="mt-2 p-1.5 w-full border border-gray-300 rounded-sm text-sm"
                    />
                </div>

                <div className="flex w-full justify-evenly mb-4">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-8 h-8 rounded-full ${color} ${highlightColor === color ? 'ring-2 ring-indigo-500' : ''}`}
                            onClick={() => setHighlightColor(color)}
                        ></button>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-sm text-sm"
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={favourite}
                            onChange={(e) => setFavourite(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-sm font-medium">Favourite</span>
                    </label>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className={`px-4 py-2 bg-indigo-600 text-white  rounded-sm text-sm hover:bg-indigo-700`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-sm text-sm hover:bg-indigo-700"
                        disabled={addingNote}
                    >
                        {addingNote ? <Loading /> : 'Create'}
                    </button>
                </div>
            </form>


        </div>
    );
};

export default NewHighlight;
