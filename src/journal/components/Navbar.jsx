import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

// eslint-disable-next-line react/prop-types
export const Navbar = ({ drawewidth = 280 }) => {

    const distpatch =  useDispatch();
    
    const onLogout = () => {
        distpatch( startLogout() );
    }



    return (
        <AppBar 
            position="fixed"
            sx={{
                width:{ sm: `calc(100% - ${ drawewidth }px)`},
                ml: { sm: `${ drawewidth }px`}
            }}
        >
            <Toolbar >

                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none'} }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component='div'
                        sx={{ fontFamily: "'Lobster', cursive" }} 
                    >
                        My Journal 💕
                    </Typography>

                    <IconButton 
                        color='error'
                        onClick={ onLogout }
                    >
                        <LogoutOutlined />
                    </IconButton>

                </Grid>
            


            </Toolbar>
            
        </AppBar>
    )
}
