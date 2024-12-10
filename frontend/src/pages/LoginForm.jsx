import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({email, password});
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            const data = await response.json();
            console.log(data.token);

            if(data.token){
                localStorage.setItem('token', data.token);
                navigate('/TaskForm');
            } else {
                alert(data.message);
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.log('error : ',  error);
        }
    }

    return (
            <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit} >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Login
                </button>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Belum punya account?{" "}
                    <a href="/Register" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm