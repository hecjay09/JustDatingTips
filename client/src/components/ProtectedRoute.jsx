import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

export default function ProtectedRoutes({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
        auth().catch(() => {
            setIsAuth(false);
        });
    }, []);
    const refreshToken = async () => {
        const rToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: rToken,
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        } catch (e) {
            console.error(e);
            setIsAuth(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuth(false);
            return;
        }
        const decodedToken = jwtDecode(token);
        const tokenExpiry = decodedToken.exp;
        const now = Date.now() / 1000;

        // if decoded token has expired
        if (tokenExpiry < now) {
            await refreshToken();
        } else {
            setIsAuth(true);
        }
    };

    if (isAuth === null) {
        <div>Loading..</div>;
    }

    return isAuth ? children : <Navigate to="/login" />;
}
