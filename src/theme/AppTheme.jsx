import { CssBaseline, ThemeProvider } from "@mui/material";
import { purpleTheme } from "./";

// eslint-disable-next-line react/prop-types
export const AppTheme = ({ children }) => {
    return (
        <>
            <ThemeProvider theme={ purpleTheme }>
                <CssBaseline />
                { children }
            </ThemeProvider>
        </>
    )
}
