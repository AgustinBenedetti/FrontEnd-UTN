import { createContext, useEffect, useState } from "react";
import { useJwt, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";

export const AUTH_TOKEN_KEY = 'auth_token'

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    
    const navigation = useNavigate()
    const [user, setUser] = useState(null)

    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem(AUTH_TOKEN_KEY)))
    
    useEffect(
        () => {
            if(!localStorage.getItem(AUTH_TOKEN_KEY)){
                setIsLogged(false)
                setUser(null)
                return
            }

            const user = decodeToken(localStorage.getItem(AUTH_TOKEN_KEY))
            if(user){
                setUser(user)
                setIsLogged(true)
            }
            else{
                setUser(null)
                setIsLogged(false)
            }
        }, []);

    function onLogout(){
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setUser(null)
        setIsLogged(false)
        navigation('/login')
    }

    function onLogin(auth_token){
        localStorage.setItem(AUTH_TOKEN_KEY, auth_token)
        setIsLogged(true)
        const user_session = decodeToken(auth_token)
        setUser(user_session)
        navigation('/home'), {
            replace: true
        }

    }
    
    return (
        <AuthContext.Provider value={{ user, isLogged, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;