import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    // llamo el status del store
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        // Obtiene la data del usuario
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            // si no hay usuario coloca estado logout
            if( !user ) return dispatch( logout() );
            // si existe usuario- logeo
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );
            // cargo las notas del usuario
            dispatch( startLoadingNotes() );
        });
        
    }, [])

    return status;
}