import { Box, Toolbar } from "@mui/material"
import { Navbar, SideBar } from "../components";


const drawerWidth = 280;
/* eslint-disable react/prop-types */
export const JournalLayout = ({ children }) => {
    return (
        <Box 
            sx={{ display: 'flex'}} 
            // animacion
            className="animate__animated animate__fadeIn animate_faster" 
        >
            
            {/* Navbar */}
            <Navbar drawerWidth={ drawerWidth } />

            {/* Sidebar */}
            <SideBar drawerWidth={ drawerWidth }/>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Toolbar />
                { children }               
            </Box>

        </Box>
    )
}
