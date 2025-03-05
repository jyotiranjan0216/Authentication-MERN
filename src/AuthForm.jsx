import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    console.log(` successful`, formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
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
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {type === "signup" && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
          <Link to={type === "signin" ? "/signup" : "/signin"} className="text-blue-500 ml-1 hover:underline">
            {type === "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
