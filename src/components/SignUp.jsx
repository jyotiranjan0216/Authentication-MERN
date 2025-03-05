import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", number: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.number || !formData.email || !formData.password) {
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

      if (response.status === 409) {
        handleError("User already exists!");
        return;
      } else if (response.status === 201) {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 to-red-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-96"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-orange-600"
        >
          Create Your Account
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-5"
        >
          {["name", "number", "email", "password"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <label className="block text-gray-700 capitalize font-semibold">{field}</label>
              <input
                type={field === "email" ? "email" : field === "number" ? "tel" : field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                autoComplete={field === "password" ? "new-password" : field === "number" ? "tel" : "off"}
                className="w-full p-3 border-2 border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 transform hover:scale-105 focus:scale-105"
              />
            </motion.div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-400 transform hover:scale-105"
          >
            Sign Up
          </motion.button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?
            <Link to="/signin" className="text-orange-600 ml-1 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export { SignUp };
