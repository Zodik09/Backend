import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/Router";

const useAuth = () => {
    const [checkedAuth, setCheckedAuth] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const hasRedirected = useRef(false);
    const navigate = useNavigate();

    const checkAuth = useCallback(async (options = { redirectToChat: false }) => {
        try {
            await instance.get("/auth/verify");
            setIsAuthenticated(true);

            if (options.redirectToChat && !hasRedirected.current) {
                navigate("/chat", { replace: true });
                hasRedirected.current = true;
            }
        } catch {
            setIsAuthenticated(false);
        } finally {
            setCheckedAuth(true);
        }
    }, [navigate]);

    return { isAuthenticated, checkedAuth, checkAuth };
};

export default useAuth;
