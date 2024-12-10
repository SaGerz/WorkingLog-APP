import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState ({
        email: "",
        password: "",
        name: "", 
        role: "employee"
    })

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData, 
            [e.target.name]:  e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({formData});
            const response =  await fetch('http://localhost:5000/auth/register', {
                method:'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json(); 
            if(response.ok){    
                alert('Registrasi Sukses');
                navigate('/Login');
            } else {
                alert(data.message || "Registrasi gagal");
            }
        } catch(error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-5 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700" >Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Pasword</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                            />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            // disabled // Disable karena hanya ada 1 opsi
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;