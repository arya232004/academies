import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { accountcreation } from '../home/functions';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthStateChanged = async (user) => {
            setUser(user);
            setLoading(false);
            console.log(window.location.pathname.split('/'));
            if (user && window.location.pathname.split('/')[1] ==='') {
                await accountcreation(user);
                navigate('/');
            } else if (!user && window.location.pathname.split('/')[1] !== 'login'){
                navigate('/login');
            }
        };
    
        const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
    
        return unsubscribe; // Cleanup function to unsubscribe from the auth state listener
    }, [navigate]);
    

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

async function signout(){
    await signOut(auth).then(() => {
        window.location.href = "/login";
    });
}

export { signout };