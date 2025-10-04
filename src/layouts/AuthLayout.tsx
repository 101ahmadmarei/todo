import {Outlet} from "react-router-dom";
import AuthSidebar from "@/components/AuthSidebar";
import ThemeAndLanguage from "@/components/ThemeAndLanguage.tsx";

export default function AuthLayout() {

    return (
        <div className="flex h-screen ">
            <AuthSidebar/>
            <div className="flex flex-col flex-1 items-center justify-center bg-background pt-3 px-3 pb-5">
                <div className=" w-full flex justify-center lg:justify-end">
                    <div className="hidden lg:flex  gap-4">
                        <ThemeAndLanguage/>
                    </div>
                    <img src="/assets/Logo-3.png" alt="Ghost" className="lg:hidden"/>
                </div>
                <div className="flex  flex-1 items-center justify-center ">
                    <Outlet/>
                </div>
                <div className=" w-full flex justify-center  lg:justify-end">
                    <img src="/assets/Logo-2.png" alt="Ghost" className="lg:w-30"/>
                </div>
            </div>
        </div>
    );
}