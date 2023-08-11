import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

// Status manual 
export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

// Status google
export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        // LLamo la authenticación google-firebase
        // Tengo el retorno del provider
        const result = await signInWithGoogle();
        // Si se cancela el ingreso
        if( !result.ok ) return dispatch( logout( result) );
        // si se logra ingresar
        dispatch( login( result ) );
        // console.log(result)
        
    }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, email, password }); 
        // Si hay un error cambio el estado y envio el error
        if( !ok ) return dispatch( logout( { errorMessage } ) );
        
        // Si no hay error se logea y actualiza el estado
        dispatch( login({ uid, displayName, email, photoURL }) )
    }   
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password });
        // Si hay un error en la petición del provider
        if( !ok ) return dispatch( logout( { errorMessage }));

        dispatch( login({  uid, displayName, photoURL, email}) );
    }
}

// cerrar sesión
export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        // Limpiar store.journal
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}

