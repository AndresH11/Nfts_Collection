//IMPORTAMOS UNA FUNCION DE REACT
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext(); //ESTE OBJETO ES QUIEN CONTIENE EL VALOR

export const AuthProvider = ({ children })=>{

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [vigila, setVigila] = useState(true);
    
    //REGISTRAR UN USUARIO
    const signup = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password); //ESTO DEVUELVE UNA PROMESA
    }

    //LOGEAR UN USUARIO
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password); //ESTO DEVUELVE UNA PROMESA
    }

    //LOGEARSER CON GOOGLE
    const loginWithGoogle = ()=>{
        const Googleprovider = new GoogleAuthProvider();
        return signInWithPopup(auth, Googleprovider);
    };

    //RESETEAR UNA CONTRASEÑA

    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    
    //COMPROBAR QUE ESTÉ LOGUEADO
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe();
    },[vigila]);

    //CERRAR SESION
    const logOut = async()=>{
        try {
            await signOut(auth);
            setVigila(!vigila);
        } catch (error) {
            console.error(error,'cerrar sesion')
        }
    };

    return(
        //LO QUE ESTÁ ACÁ ADENTRO VA A PODER INGRESAR SI EL USUARIO ESTÁ LOGUEADO
        <authContext.Provider value={{ signup, login, user, logOut, loading, loginWithGoogle, resetPassword, vigila, setVigila }}>
            { children }
        </authContext.Provider>
    );
};

//HOOK
//ESTE HOOK VA A CONTENER TODA LA INFORMACION DEL USUARIO
export const useAuth = ()=>{
    const context = useContext(authContext);
    if(!context) throw new Error('there is not auth provider');
    return context;
};