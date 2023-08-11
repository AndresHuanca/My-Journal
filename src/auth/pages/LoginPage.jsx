import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
    email: '',
    password: '',
};
const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
    password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras' ],
};

export const LoginPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);
    // Obtengo el stado del status
    const { status, errorMessage } = useSelector( state => state.auth );
    // console.log(status)
    const statusLogin = useMemo(() => ( status === 'checking') , [status])
    // console.log(statusLogin)

    // Inputs de formulario( value, name, onChange)
    const { 
        formState, email, password, onInputChange,
        isFormValid, emailValid, passwordValid, 
    } = useForm( formData, formValidations );

    // Manejo de form - colocar en el button type='submit'
    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        // Si las validaciones pasan se obtiene el form,
        if( !isFormValid ) return;
        dispatch( checkingAuthentication() );
        // console.log({email, password});
        dispatch( startLoginWithEmailPassword( formState ) );
    };

    // Manejo de google - colocar en el button  onClick={ onGoogleSignIn }
    const onGoogleSignIn = () => {
        // console.log('onGoogleSignIng');
        dispatch( startGoogleSignIn() );
    };


    return (
        <AuthLayout title="Login">
            <form 
                onSubmit={ onSubmit } 
                // animacion
                className="animate__animated animate__fadeIn animate_faster" 
            >
                <Grid container>
                    
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

                        <Grid item  xs={ 12 }  sm={ 6 } >
                            <Button
                                disabled= { statusLogin }
                                variant="contained" 
                                fullWidth
                                type='submit'
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item  xs={ 12 }  sm={ 6 } >
                            <Button
                                disabled= { statusLogin } 
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                            >
                                <Google />
                                    <Typography sx={{ml:1}} >Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={ RouterLink } color="inherit" to="/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>          
            </form>

        </AuthLayout>

    )
}
