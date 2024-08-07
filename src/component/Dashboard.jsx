// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import NewHighlight from "./NewHighlight.jsx";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import AllNotes from "./AllNotes.jsx";
import { IoIosAddCircleOutline } from "react-icons/io";
import Loading from "./loading/Loading.jsx";

import "../index.css"

const Dashboard = ({ handleLogout }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewNoteVisible, setIsNewNoteVisible] = useState(false);

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

    const logout = () => {
        handleLogout();
        navigate('/');
    };

    const toggleNewNoteVisibility = () => {
        setIsNewNoteVisible(!isNewNoteVisible);
    };

    if (loading) return <Loading/>;
    if (!userDetails) return <div>No user details available</div>;

    return (
        <>
            <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-md ">
                <Link to='/profile' className=' hover:underline'>
                <div className="flex items-center gap-4">
                    <FaUserCircle className="text-3xl" />
                    <h1 className="text-2xl font-bold">{userDetails.name.charAt(0).toUpperCase() + userDetails.name.substring(1)}</h1>
                </div>
                </Link>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                    <AiOutlineLogout className="text-xl" />
                    <span>Logout</span>
                </button>
            </nav>

            <div className="p-4 ">
                {isNewNoteVisible && <NewHighlight />}
            </div>

            <button
                onClick={toggleNewNoteVisibility}
                className="fixed bottom-5 z-50 right-5 p-4 card bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 focus:outline-none"
            >
                <IoIosAddCircleOutline className="text-3xl" />
            </button>


            <AllNotes/>

        </>
    );
};

export default Dashboard;
