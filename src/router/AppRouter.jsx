import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/authRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui";


export const AppRouter = () => {
    
    // Custom hook
    const status = useCheckAuth();
    
    if( status ==='checking' ) {
        return <CheckingAuth />
    }

    return (
        <>
            <Routes >
                {/* Proteción de rutas si estoy autenticado */}
                {
                    ( status === 'authenticated')
                    ? <Route path="/*" element={ <JournalRoutes /> }/>      
                    : <Route path="/auth/*" element={ <AuthRoutes /> }/>
                }     

                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                

                {/* Login-register */}
                {/* ruta que inicie en login o cualquier extension de ella */}
                {/* <Route path="/auth/*" element={ <AuthRoutes /> }/>     */}
                
                {/* Journal */}
                {/* Cualquier ruta completamente diferente de login ingresa */}
                {/* <Route path="/*" element={ <JournalRoutes /> }/>     */}

            </Routes>

        </>
    )
}
