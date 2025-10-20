import { createContext, useEffect, useState } from "react";
import { useJwt, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    

    const navigation = useNavigate()
    
    //Datos de sesion
    const [user, setUser] = useState(null)

    //Marca si esta o no logueado el usuario
    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('auth_token')))
    
    //Una vez se monte el componente decofificar el token y guardar los datos de sesion
    useEffect(
        () => {
            if(!localStorage.getItem('auth_token')){
                setIsLogged(false)
                setUser(null)
                return
            }

            const user = decodeToken(localStorage.getItem('auth_token'))
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
        localStorage.removeItem('auth_token')
        setUser(null)
        setIsLogged(false)
        navigation('/login')
    }

    function onLogin(auth_token){
        localStorage.setItem('auth_token', auth_token)
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