import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid='' ) => {
    if( !uid ) throw new Error('UID no existe-usuario');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )
    const docs = await getDocs( collectionRef );
    
    let notes = [];
    
    docs.forEach( doc => {
        // ...doc.data() esparce los datos restantes
        notes.push({ id: doc.id, ...doc.data() });
    });
    
    return notes;
}