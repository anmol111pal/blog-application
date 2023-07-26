import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "",
        username: ""
    });

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}} >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;