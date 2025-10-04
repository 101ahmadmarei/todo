import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState, useEffect} from "react"
import ThemeAndLanguage from "@/components/ThemeAndLanguage.tsx";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {User, LogOut} from "lucide-react";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUserFromStorage = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };

        getUserFromStorage();

        const handleAuthChange = () => {
            getUserFromStorage();
        };

        window.addEventListener('authChange', handleAuthChange);

        return () => {
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    const getInitials = (name: string): string => {
        if (!name || name.trim() === '') {
            return 'U';
        }

        return name
            .trim()
            .split(' ')
            .filter(n => n.length > 0)
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    };

    return (
        <nav className="py-3   bg-background rounded-t-lg">
            <div className="container px-3 mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/src/assets/Logo-3.png" alt="Todo" className="h-8 w-auto"/>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeAndLanguage/>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-full overflow-hidden w-9 h-9">
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={user?.avatar}/>
                                    <AvatarFallback className="text-sm font-semibold">
                                        {getInitials(user?.name || user?.email || '')}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4"/>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Exit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}