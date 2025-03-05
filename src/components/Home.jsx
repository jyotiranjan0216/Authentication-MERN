import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils";
import { ToastContainer } from "react-toastify";

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-150 text-center">
                <h1 className="text-xl font-bold text-gray-800">Name: <span className="text-blue-600">{name}</span></h1>
                <h1 className="text-xl font-bold text-gray-800">Mobile Number: <span className="text-blue-600">{number}</span></h1>
                <h1 className="text-xl font-bold text-gray-800">Email ID: <span className="text-blue-600">{email}</span></h1>
                
                <button 
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                    Logout
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
