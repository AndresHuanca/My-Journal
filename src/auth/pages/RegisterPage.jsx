
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
    displayName: '',
    email: '',
    password: '',
};

const formValidations = {
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ],
    email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
    password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras' ],
};

export const RegisterPage = () => {
    
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { status, errorMessage } = useSelector( state => state.auth );

    // Para bloquear el boton en estasdo en checking
    const isCheckingAuthentication = useMemo(() => (status === 'checking'), [status])
    
    // Hook of form
    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,  
    } = useForm( formData, formValidations );

    
    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        // Si las validaciones pasan se obtiene el form,
        if( !isFormValid ) return;
        // console.log(formState)
        // Llamo del thunks
        dispatch( startCreatingUserWithEmailPassword( formState ) );
    };

    return (
        <AuthLayout title="Crear Cuenta">
            <form  
                onSubmit={ onSubmit }
                // animacion
                className="animate__animated animate__fadeIn animate_faster" 
            >
                <Grid container>
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre'
                            type="text"
                            placeholder="Nombre"
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted}
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type="email"
                            placeholder="Correo@google.com"
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted}
                            helperText={ emailValid }
                        />
                    </Grid>
                    
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted}
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2 , mt: 1 }}>
                        {/* Message Error */}
                        <Grid 
                            item  xs={ 12 }  
                            sm={ 12 }
                            // eslint-disable-next-line no-extra-boolean-cast
                            display={ !!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error' >{ errorMessage }</Alert>
                        </Grid>

                        {/* button */}
                        <Grid item  xs={ 12 }  sm={ 12 } >
                            <Button 
                                type='submit'
                                variant="contained" 
                                fullWidth
                                disabled= { isCheckingAuthentication }
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }} >¿Ya tienes una cuenta?</Typography>
                        <Link component={ RouterLink } color="inherit" to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>          
            </form>

        </AuthLayout>

    )
}
