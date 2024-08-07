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
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Profile</h2>
            <div className="flex items-center gap-4 mb-6">
                <AiOutlineUser size={30} className="text-gray-500" />
                <div>
                    <p className="text-lg font-semibold text-gray-800">{userDetails.name}</p>
                    <p className="text-sm text-gray-600">{userDetails.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
                <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                    <AiOutlineFileText size={24} className="text-gray-600" />
                    <div>
                        <p className="text-gray-700">Total Notes</p>
                        <p className="font-semibold">{userDetails.totalNotes}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                    <AiOutlineStar size={24} className="text-gray-600" />
                    <div>
                        <p className="text-gray-700">Total Favorites</p>
                        <p className="font-semibold">{userDetails.totalFav}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm">
                    <AiOutlineGroup size={24} className="text-gray-600" />
                    <div>
                        <p className="text-gray-700">Total Groups</p>
                        <p className="font-semibold">{userDetails.totalGroup}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
