import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Draggable from 'react-draggable';
import GroupSelector from "./GroupSelecter.jsx";
import ColorPicker from "./ColorPicker.jsx";
import {defaultColor} from "./constant.jsx";


const colors = ['bg-yellow-300', 'bg-pink-300', 'bg-blue-300', 'bg-green-300'];


const Dashboard = ({ handleLogout }) => {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/');
    };

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    const [color, setColor] = useState(defaultColor);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [group, setGroup] = useState('');
    const [groups, setGroups] = useState(['Group 1', 'Group 2']);

    const handleAddGroup = () => {
        if (group && !groups.includes(group)) {
            setGroups([...groups, group]);
            setGroup('');
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage

                const response = await fetch('https://notesapi-production-c782.up.railway.app/user/user_details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!userDetails) return <div>No user details available</div>;


    return (

        <div className="flex justify-end gap-3 m-2 p-2 items-center bg-gray-100">
            <h1 className="text-3xl font-bold flex items-center">  {userDetails.name.charAt(0).toUpperCase() + userDetails.name.substring(1)}</h1>
            <button
                onClick={logout}
                className='bg-red-500 text-white px-4 py-2 rounded'
            >
                Logout
            </button>


            <Draggable>
                <div className={`p-4 rounded-lg shadow-lg ${color} w-64 border border-gray-700`} style={{ zIndex: 100 }}>
                    <div className="flex flex-col space-y-2">
                        <ColorPicker color={color} setColor={setColor} />
                        <input
                            type="text"
                            className="p-2 border rounded bg-gray-800 text-white border-gray-700"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="p-2 border rounded bg-gray-800 text-white border-gray-700"
                            placeholder="Content"
                            rows="4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <GroupSelector
                            group={group}
                            groups={groups}
                            setGroup={setGroup}
                            handleAddGroup={handleAddGroup}
                        />
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default Dashboard;
