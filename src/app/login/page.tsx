'use client'
import { useState } from 'react';
import { useAuth } from '../contexts/JWTContext';
import { permanentRedirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-white">
            <div className="p-4 bg-slate-600 shadow-lg rounded-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="shadow-sm text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:shadow-sm-light" placeholder="example@example.com" required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="shadow-sm text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:shadow-sm-light" required />
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
