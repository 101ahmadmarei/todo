import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../tailwind.css'
import App from './App.tsx'
import {ThemeProvider} from '@/store/theme-provider.tsx'
import {LanguageProvider} from '@/components/language-provider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <LanguageProvider defaultLanguage="en" storageKey="language">
                <App/>
            </LanguageProvider>
        </ThemeProvider>
    </StrictMode>,
)
