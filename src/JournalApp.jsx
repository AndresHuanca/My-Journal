import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const JournalApp = () => {
  
    useEffect(() => {
    const url = window.location.href;
    if (!url.includes('/404.html')) {
      window.location.href = '/404.html';
    }
  }, []);

  return (
    
    <>
        {/* Theme  */}
        <AppTheme >
          {/* Main Router */}
          <AppRouter />
        </AppTheme>
    </>

  )
}
