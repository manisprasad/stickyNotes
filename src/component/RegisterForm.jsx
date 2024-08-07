import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import sticky from "../assets/sticky2.png";
import frame from "../assets/frame.png";

const RegisterForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "", username: "" });
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await fetch('https://notesapi-production-c782.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            if (data.access_token) {
                // Save the JWT token to localStorage
                localStorage.setItem('token', data.access_token);
                toast.success('Registration successful!');
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                throw new Error('No access token received');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-richblack-900 w-full relative">
            <div className='flex justify-evenly w-[1060px]'>
                <div className="bg-richblack-700 shadow-lg rounded-lg p-8 w-full max-w-md box1">
                    <h2 className="text-2xl font-bold mb-6 text-center gradient-shade1 text-black pb-2">Register</h2>
                    <form onSubmit={submitHandler} className='flex flex-col gap-y-4'>
                        <label htmlFor='username' className='w-full'>
                            <p className='text-sm text-black mb-1'>
                                Username<sup className='text-red-500'>*</sup>
                            </p>
                            <input
                                className='bg-gray-200 border border-gray-300 rounded-md text-richblack-900 w-full p-3'
                                required
                                type='text'
                                placeholder='Enter Username'
                                name='username'
                                value={formData.username}
                                id='username'
                                onChange={changeHandler}
                            />
                        </label>

                        <label htmlFor='emailid' className='w-full'>
                            <p className='text-sm text-black mb-1'>
                                Email Address<sup className='text-red-500'>*</sup>
                            </p>
                            <input
                                className='bg-gray-200 border border-gray-300 rounded-md text-richblack-900 w-full p-3'
                                required
                                type='email'
                                placeholder='Enter Email Id'
                                name='email'
                                value={formData.email}
                                id='emailid'
                                onChange={changeHandler}
                            />
                        </label>

                        <label className='w-full relative'>
                            <p className='text-sm text-black mb-1'>
                                Password<sup className='text-red-500'>*</sup>
                            </p>
                            <input
                                className='bg-gray-200 border border-gray-300 rounded-md text-richblack-900 w-full p-3 pr-12'
                                required
                                type={!showPassword ? 'password' : 'text'}
                                onChange={changeHandler}
                                value={formData.password}
                                placeholder='Enter Password'
                                name='password'
                            />
                            <span
                                className='absolute top-9 right-3 flex items-center cursor-pointer'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ?
                                    <AiOutlineEyeInvisible fontSize={24} fill='#6B7280' /> :
                                    <AiOutlineEye fontSize={24} fill='#6B7280' />}
                            </span>
                        </label>

                        <button
                            className='bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium px-4 py-2 mt-6 transition duration-300'
                        >
                            Register
                        </button>

                        <div className='mt-4 text-center'>
                            <p className='text-sm text-black'>
                                Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='relative min-w-[40%] min-h-[100%] flex justify-center items-center'>
                    <img
                        className='absolute w-[100%] h-[90%] z-20 rounded-lg box2'
                        src={sticky}
                        alt="Sticky Note"
                    />
                    <img
                        className='absolute w-[100%] h-[90%] z-10 -top-0 -right-6 rounded-lg '
                        src={frame}
                        alt="Frame"
                    />
                </div>
            </div>

            {/* Back Button */}
            <Link to="/login" className="absolute bottom-4 right-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Back
                </button>
            </Link>
        </div>
    );
}

export default RegisterForm;
