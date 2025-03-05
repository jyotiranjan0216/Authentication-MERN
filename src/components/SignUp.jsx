import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";

const SignUp = () => {
    const [formData, setFormData] = useState({name: "", number: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      // console.log("Sign up successful", formData);
      if( !formData.name || !formData.number || !formData.email || !formData.password ) {
        handleError("All fields are required");
        return;
      }
      try {
        const response = await fetch("https://auth-backend-wubv.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        // console.log("data", data);
        if (response.status === 409) {
          handleError("User already exists!");
          return;
        }else if (response.status === 201) {
          handleSuccess("User created successfully!");
          setTimeout(() => { 
            navigate("/signin");
          }, 2000);
        } else if (response.status === 400) {
          handleError(data.error);
        } else {
          handleError("Internal server error");
        }
    } catch (error) {
        handleError(error);
        return;
    }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile</label>
            <input 
              type="tel" 
              name="number" 
              value={formData.number} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                autoComplete="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                autoComplete="new-password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account? 
              <Link to="/signin" className="text-blue-500 ml-1 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export { SignUp };