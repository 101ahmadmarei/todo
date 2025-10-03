import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignIn from "./pages/SignIn.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import {useEffect, useState} from "react";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            const user = localStorage.getItem('user');
            setIsLoggedIn(!!user);
            setIsLoading(false);
        };

        checkAuthStatus();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user') {
                checkAuthStatus();
            }
        };

        const handleAuthChange = () => {
            checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/signin" replace/>}/>

                <Route path="/signin" element={
                    isLoggedIn ? <Navigate to="/" replace/> : <AuthLayout/>
                }>
                    <Route index element={<SignIn/>}/>
                </Route>

                <Route path="/signup" element={
                    isLoggedIn ? <Navigate to="/" replace/> : <AuthLayout/>
                }>
                    <Route index element={<SignUp/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
