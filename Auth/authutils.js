import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const getUserIdFromToken = () => getDecodedToken()?.id || null;
export const getUserEmailFromToken = () => getDecodedToken()?.email || null;
