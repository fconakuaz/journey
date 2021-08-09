import Swal from "sweetalert2";

import { db         } from "../firebase/fireBase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes  } from "../helpers/loadNotes";
import { types      } from "../types/types";

// react-journal

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const newNote = {
                            title : '',
                            body  : '',
                            date  : new Date().getTime(),
                            url   : 'https://images.vectorhq.com/images/istock/previews/9720/97203331-calendar-icon-vector-illustration-calendar-icon-calendar-ic.jpg',
                        };
        const note    = await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch( activeNote( note.id, newNote ) );   
        dispatch( addNewNote( note.id, newNote ) );   

    }
}

export const activeNote = ( id, note ) => ({
    type    : types.notesActive,
    payload : {
                id: id,
                ...note
              }
});

export const addNewNote = ( id, note ) => ({
    type : types.notesAdded,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    };
};

export const setNotes = ( notes ) => ({
    type    : types.notesLoad,
    payload : notes
});

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) 
            delete note.url;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        
        try {
            const updateNote = await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFireStore );
            dispatch( refreshNote( note.id, noteToFireStore ) );
            Swal.fire('Saved',note.title,'success');
        } 
        catch (error) {
            Swal.fire('Error', error, 'error');
        }
    };
};

export const refreshNote = (id, note) => ({
    type    : types.notesUpdate,
    payload : {
                id,
                note: {
                    id,
                    ...note
                }            
              }
});

export const startUploadFile = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title : 'Uploading...',
            text  : 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
        });

        const fileUrl  = await fileUpload( file );
        activeNote.url = fileUrl;
        console.log('-- activeNote: ',activeNote);
        dispatch( startSaveNote( activeNote ) );
        Swal.close();
    }
};

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        console.log(`${ uid }/journal/notes/${ id }`);
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});