import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import sticky from "../assets/second.jpg";
import frame from "../assets/frame.png";
import Loading from "./loading/Loading.jsx";

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function changeHandler(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('https://notesapi-production-c782.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                toast.success('Login successful!');
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                throw new Error('No access token received');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-richblack-900 w-full relative">
            <div className='flex justify-evenly w-[1060px] '>
                <div className="bg-richblack-700 shadow-lg rounded-lg p-8 w-full max-w-md box1">
                    <h2 className="text-2xl font-bold mb-6 text-center gradient-shade1 pb-1">Login</h2>
                    <form onSubmit={submitHandler} className='flex flex-col gap-y-4'>
                        <label htmlFor='usernameid' className='w-full'>
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
                                id='usernameid'
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
                            type='submit'
                            className={`bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium px-4 py-2 mt-6 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}  // Disable button while loading
                        >
                            {isLoading ? <Loading /> : 'Login'}
                        </button>

                        <div className='mt-4 text-center'>
                            <p className='text-sm text-black'>
                                Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='relative min-w-[50%] min-h-[100%] flex justify-center items-center'>
                    <img
                        className='absolute w-[85%] h-[100%]  z-20 rounded-lg box2'
                        src={sticky}
                        alt="Sticky Note"
                    />
                    <img
                        className='absolute w-[85%] h-[100%] z-10 -top-5 right-6 rounded-lg '
                        src={frame}
                        alt="Frame"
                    />
                </div>
            </div>

            {/* Back Button */}
            <Link to="/" className="absolute bottom-4 right-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Back
                </button>
            </Link>
        </div>
    );
}

export default LoginForm;
