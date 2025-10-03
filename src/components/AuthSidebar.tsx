
export default function AuthSidebar() {
    return (
        <div className="hidden md:flex flex-col justify-between bg-primary text-white w-1/2 p-8">
            {/* Top Logo */}
            <div className="flex items-center gap-2">
                <div className="bg-white text-primary font-bold rounded-full h-10 w-10 flex items-center justify-center">
                    T
                </div>
                <span className="text-2xl font-extrabold tracking-wide">TODO</span>
            </div>

            {/* Center Ghost + Text */}
            <div className="flex flex-col items-center text-center">
                <img src="/ghost-1.png" alt="Ghost" className="h-28 w-auto mb-6" />
                <div className="bg-white text-primary font-bold px-4 py-2 rounded-lg shadow">
                    The Haunted ToDo List <br />
                    Tasks That Won’t Stay Buried!
                </div>
            </div>

            {/* Bottom ghost + text */}
            <div className="flex items-center gap-2">
                <img src="/ghost-2.png" alt="Ghost" className="h-12 w-auto" />
                <span className="text-sm">Tech Valley</span>
            </div>
        </div>
    );
}