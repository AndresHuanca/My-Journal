import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store"

export const NoteView = () => {

    const dispatch =  useDispatch();
    // Selecciona la nota activa
    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
    // Para manejar los formularios
    const { title, body, date, formState, onInputChange } = useForm( note );

    // conversión de fecha
    const newDate = useMemo(() => {
        let newwdate = new Date(date);
        
        return newwdate.toLocaleString('es-ES', {
            year: 'numeric',month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
        });
        
    }, [ date ]);

    // Mantiene la referencia
    const fileInputRef =  useRef();

    // Actualiza la nota en el slice
    useEffect(() => {
        dispatch( setActiveNote( formState) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ formState ])

    // Alert
    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [ messageSaved ])
    
    
    const onSaveNote = () => {
        // Guardar en thunks
        dispatch( startSaveNote() );
    }
    // Carga de arhivos
    const onFileInputChange = ({ target }) => {
        // Validación si no hay nada
        if( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid 
            container 
            direction="row" 
            justifyContent="space-between" 
            sx={{ mb: 1}}
            // animacion
            className="animate__animated animate__fadeIn animate_faster"     
        >
            {/* Fecha */}
            <Grid item>
                <Typography fontSize={ 39 } fontWeight="light" >{ newDate }</Typography>
            </Grid>
            {/* Button guardar */}
            <Grid item>

                {/* subir archivos */}
                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    // Eiste, pero visualmente no se ve
                    style={{ display: 'none'}}
                />
                {/* Icono de carga */}
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                

                <Button
                    disabled={ isSaving } 
                    color="primary" 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>
            
            <Grid container>

                {/* Titulo */}
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label='Título'
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                {/* Comentario */}
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio en el día de hoy?"
                    label="Comentario"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
                
            </Grid>

            <Grid container justifyContent='end' >
                <Button
                    onClick={ onDelete } 
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={ note.imageUrls } />

        </Grid>        
    )
}
