import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../tailwind.css'
import App from './App.tsx'
import {ThemeProvider} from '@/components/theme-provider'
import {LanguageProvider} from '@/components/language-provider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="haunted-todo-theme">
            <LanguageProvider defaultLanguage="en" storageKey="haunted-todo-language">
                <App/>
            </LanguageProvider>
        </ThemeProvider>
    </StrictMode>,
)
