import { createContext, useContext, useEffect, useState } from "react"

export const ROLES = {
    ADMIN: "admin",
    STUDENT: "student",
    LECTURER: "lecturer",
    ASSISTANT: "assistant",
    REGISTRAR: "registrar"
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(false);

    const updateUser = (a) => {console.log("updating users");setUser(a)}

    useEffect(() => {

        const localUser = localStorage.getItem("user");
        if (localUser) {
            setUser(JSON.parse(localUser))            
            console.log("user found");
            setLoading(false)
            return;
        }
        const fetchUserData = async () => {
            try {
 
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        fetchUserData();

    }, []);



    const hasRole = (requiredRoles) => {
        console.log(user.role.toLowerCase() === requiredRoles.toLowerCase());
        if (!user) return false;

        return user.role.toLowerCase() === requiredRoles.toLowerCase();
    }

    return (
        <AuthContext.Provider value={{ user, loading, updateUser, hasRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }    
    return context;
}
