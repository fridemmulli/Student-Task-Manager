import { createContext, useState, ReactNode } from "react";
import axios from "../services/api";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("/auth/login", { email, password });
            console.log("Login response:", res.data);
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            return true;
        } catch (err: any){
            console.error("Login error:", err.response?.data || err.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
