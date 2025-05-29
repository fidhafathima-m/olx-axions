import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const data = localStorage.getItem('user');
        if(data) {
            setUser(JSON.parse(data));
        } else {
            setUser(null); 
        }
    }, [])

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);