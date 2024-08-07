import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineFileText, AiOutlineStar, AiOutlineGroup } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

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
                console.log(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);
    console.log(userDetails);

    if (loading) return <div>Loading...</div>;

    if (!userDetails) return <div>No user details available</div>;

    return (
        <div className=' w-full h-screen flex items-center justify-center '>
            <div className="flex  flex-col justify-center  w-2/4 items-center bg-gray-100 p-6 rounded-lg  shadow-inner">
                <h2 className="text-3xl uppercase font-bold mb-7 text-gray-700">Profile</h2>
                <div className="flex items-center gap-4 mb-6">
                    <AiOutlineUser size={40} className="text-gray-500 border-solid border-2 border-gray-600 rounded-full" />
                    <div>
                        <p className="capitalize text-2xl  font-semibold text-gray-800">{userDetails.name}</p>
                        <p className="text-sm text-gray-600">{userDetails.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-lg">
                        <AiOutlineFileText size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-700">Total Notes</p>
                            <p className="font-semibold">{userDetails.totalStickyNotes}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-lg">
                        <AiOutlineStar size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-700">Total Favorites</p>
                            <p className="font-semibold">{userDetails.totalFav}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-lg">
                        <AiOutlineGroup size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-700">Total Groups</p>
                            <p className="font-semibold">{userDetails.totalGroup}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
