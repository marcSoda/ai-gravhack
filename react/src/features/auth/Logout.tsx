import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner"
import { useAuth } from '@/context/AuthContext';

const Logout = () => {
    const { updateAuthStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/authx/logout", {
            withCredentials: true,
        })
        .then(() => {
            toast.success("Successfully logged out.");
            updateAuthStatus(false);
            navigate('/login');
        })
        .catch((err) => {
            toast.error("Error occurred during logout.");
            console.error(err);
        });
    }, [navigate, updateAuthStatus]);

    return null;
};

export default Logout;
