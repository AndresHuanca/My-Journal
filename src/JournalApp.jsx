import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const JournalApp = () => {
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
