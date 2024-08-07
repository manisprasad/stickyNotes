import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../index.css"

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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
                <form onSubmit={submitHandler} className='flex flex-col gap-y-4'>
                    <label htmlFor='username' className='w-full'>
                        <p className='text-sm text-gray-600 mb-1'>
                            Username<sup className='text-red-500'>*</sup>
                        </p>
                        <input
                            className='bg-gray-200 border border-gray-300 rounded-md text-gray-700 w-full p-3'
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
                        <p className='text-sm text-gray-600 mb-1'>
                            Email Address<sup className='text-red-500'>*</sup>
                        </p>
                        <input
                            className='bg-gray-200 border border-gray-300 rounded-md text-gray-700 w-full p-3'
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
                        <p className='text-sm text-gray-600 mb-1'>
                            Password<sup className='text-red-500'>*</sup>
                        </p>
                        <input
                            className='bg-gray-200 border border-gray-300 rounded-md text-gray-700 w-full p-3 pr-12'
                            required
                            type={!showPassword ? 'password' : 'text'}
                            onChange={changeHandler}
                            value={formData.password}
                            placeholder='Enter Password'
                            name='password'
                        />
                        <span
                            className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ?
                                <AiOutlineEyeInvisible fontSize={24} fill='#6B7280'/> :
                                <AiOutlineEye fontSize={24} fill='#6B7280'/>}
                        </span>
                    </label>

                    <button
                        className='bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium px-4 py-2 mt-6 transition duration-300'
                    >
                        Register
                    </button>

                    <div className='mt-4 text-center'>
                        <p className='text-sm text-gray-600'>
                            Already have an account? <Link to='/login'
                                                         className='text-blue-500 hover:underline'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
