import { Grid, Typography } from "@mui/material"

/* eslint-disable react/prop-types */
export const AuthLayout = ({ children, title }) => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ 
                    minHeight: '100vh', 
                    // backgroundColor: 'primary.main', 
                    backgroundImage: `url('https://res.cloudinary.com/dvqo6ln4u/image/upload/v1691714235/journal-app/My_Journal_l_1_pmjna6.png')`, // Ruta de la imagen de fondo
                    backgroundSize: 'cover', // Ajusta el tamaño de la imagen al contenedor
                    backgroundPosition: 'center', // Centra la imagen en el contenedor
                    padding:4 
                }}
        >

            <Grid 
                item
                className="box-shadow"
                xs={ 3 }
                sx={{ 
                    width:{ sm: 450},
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2, 
                }}
                
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

                {/* Children */}
                { children }

            </Grid>
        
        </Grid>
    
    )
}
