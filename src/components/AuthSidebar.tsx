import {useTranslation} from "@/locales/useTranslation.ts";

export default function AuthSidebar() {
    const {t} = useTranslation();

    return (
        <div className="hidden lg:flex flex-col justify-between bg-primary text-white w-[520px] p-12">
            {/* Top Logo */}
            <div className="flex  justify-center gap-2">
                <img src="/src/assets/Logo.png" alt="Ghost" className="w-auto mt-8"/>

            </div>

            {/* Center Ghost + Text */}
            <div className="">
                <img src="/src/assets/ghost-2.png" alt="Ghost" className=""/>
                <div
                    className="bg-primary-400 text-center text-lg  text-white  px-4 py-2 rounded-lg w-[300px] mx-auto shadow">
                    {t('authSidebar.message')}
                </div>
            </div>

            {/* Bottom ghost + text */}
            <div className="flex items-center gap-2">
                <img src="/src/assets/ghost-1.png" alt="Ghost" className="h-28 w-auto mb-6"/>
                <div>
                    <p className="text-sm">Tech Valley</p>
                    <p className="text-sm opacity-80">Tech Valley</p>

                </div>
            </div>
        </div>
    );
}