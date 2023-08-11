import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Authenticación con Google-firebase
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid,
        }
        
    } catch (error) {

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

// Create user Manual
export const registerUserWithEmailPassword = async({ displayName, email, password }) => {
    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // console.log(resp);
        // Actualizar el displayname en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });
        
        return {
            ok: true,
            uid, photoURL, email, displayName,
        }

    } catch (error) {
        // console.log(error);
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const loginWithEmailPassword = async({  email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        // console.log(resp);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, email, displayName,
        }
        
    } catch (error) {
        
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}
// cerrar sesión
export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}