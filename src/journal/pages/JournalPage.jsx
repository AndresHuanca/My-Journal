import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView,NoteView } from "../view";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector( state => state.journal );

    const onClickStartNewNote = () => {
        // con el dispatch puedo utilizar los thunks y selector el store
        dispatch( startNewNote() );
    };

    return (
        <JournalLayout >
            
            {/* Depende de la nota */}
            {
                // eslint-disable-next-line no-extra-boolean-cast
                ( !!active )
                ? <NoteView />
                : <NothingSelectedView />
            }
            
            
            {/* Icono */}
            <IconButton
                disabled={ isSaving }
                onClick={ onClickStartNewNote } 
                size="large"
                sx={{
                    color: "white",
                    backgroundColor: "error.main",
                    ":hover": { backgroundColor: "error.main", opacity: 0.9},
                    position: "fixed",
                    right: 50,
                    bottom: 50
                }}
            >
                {/* icono exacto */}
                <AddOutlined  sx={{ fontSize: 30 }}/>
                
            </IconButton>
        </JournalLayout>
    )
}
