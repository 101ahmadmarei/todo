import { Outlet } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";

export default function AuthLayout() {
    return (
        <div className="flex h-screen">
            {/* Sidebar always visible */}
            <AuthSidebar />

            {/* Outlet area changes (SignIn / SignUp) */}
            <div className="flex flex-1 items-center justify-center bg-background">
                <Outlet />
            </div>
        </div>
    );
}