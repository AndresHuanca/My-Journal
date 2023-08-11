import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        // Estado del boton
        dispatch( savingNote() );

        // en el getState() esta toda la información del store
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        };

        // Creo el path de inserción en la Db de firebase
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        // establecer la nota
        await setDoc( newDoc, newNote );
        // Agrego un nuevo campo con el id de firebase
        newNote.id = newDoc.id;

        // Actualizo los slices
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        // Validación
        if( !uid ) throw new Error('UID no existe-usuario');
        // Llamo el helper de carga de notas
        const notes = await loadNotes( uid ); 
        // establezco en el store las notas
        dispatch( setNotes( notes ) );

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        // Cambia el estado
        dispatch( setSaving() );
        
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        // esparzo la nota
        const noteToFireStore = { ...note };
        // Elimino id de la nota
        delete noteToFireStore.id;
        // Path para actualizar
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        // actualiza
        await setDoc( docRef, noteToFireStore, { merge:true } );
        
        dispatch( updateNote( note) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        // Para una sola imagen
        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        // Guardo en un array todas las promesas
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }
        // ejecuto todas las promesas
        const photoUrls =  await Promise.all( fileUploadPromises );
        // console.log(photoUrls)
        dispatch( setPhotosToActiveNote( photoUrls ) );
    }
}


export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await deleteDoc( docRef );
        // Eliminar del store
        dispatch( deleteNoteById( note.id ) );

    }
}







