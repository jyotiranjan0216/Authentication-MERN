import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../Utils";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("name"));
        setNumber(localStorage.getItem("number"));
        setEmail(localStorage.getItem("email"));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        handleError("Logging Out...");
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-400 to-red-500 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-orange-600 mb-6"
                >
                    Welcome, {name}!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl font-semibold text-gray-800"
                >
                    Mobile Number: <span className="text-blue-600">{number}</span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl font-semibold text-gray-800 mt-2"
                >
                    Email ID: <span className="text-blue-600">{email}</span>
                </motion.p>

                <motion.button
                    onClick={handleLogout}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-400 transform hover:scale-105"
                >
                    Logout
                </motion.button>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default Home;
