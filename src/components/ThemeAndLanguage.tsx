import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Languages, Moon, Sun} from "lucide-react";
import {useTheme} from "@/components/theme-provider";
import {useLanguage} from "@/components/language-provider";

const ThemeAndLanguage = () => {
    const {setTheme, theme} = useTheme();
    const {language, setLanguage} = useLanguage();

    const handleThemeToggle = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <div className="theme-and-language flex items-center gap-4">
            {/* Language Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Languages className="cursor-pointer h-6 w-6 hover:text-primary transition-colors"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => setLanguage("en")}
                        className={language === "en" ? "bg-accent" : ""}
                    >
                        English
                        {language === "en" && <span className="ml-auto">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setLanguage("ar")}
                        className={language === "ar" ? "bg-accent" : ""}
                    >
                        العربية
                        {language === "ar" && <span className="ml-auto">✓</span>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            {theme === "dark" ? (
                <Sun
                    className="h-8 w-8 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleThemeToggle}
                />
            ) : (
                <Moon
                    className="h-8 w-8 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleThemeToggle}
                />
            )}
        </div>
    );
};

export default ThemeAndLanguage;