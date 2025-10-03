import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from "./pages/SignIn.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignUp from "./pages/SignUp.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                {/* other routes */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
