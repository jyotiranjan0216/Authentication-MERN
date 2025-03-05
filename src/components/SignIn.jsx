import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate  = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(!formData.email || !formData.password ) {
      handleError("All fields are required");
      return;
    }
    try {
      const response = await fetch("https://auth-backend-wubv.onrender.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        handleError(data.error);
        return;
      }else if (data.success) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("name", data.name);
        localStorage.setItem("number", data.number);
        localStorage.setItem("email", data.email);
        handleSuccess("User LoggedIn successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
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
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Sign In
          </button>
          <p className="text-sm text-center mt-4">
            {"Don't have an account?"} 
            <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
