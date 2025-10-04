import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useStatusStore} from "@/store/statusStore";
import {X} from "lucide-react";
import {useTranslation} from "@/hooks/useTranslation";

const colors = [
    {value: "red", class: "bg-red-500"},
    {value: "purple", class: "bg-purple-500"},
    {value: "blue-light", class: "bg-blue-300"},
    {value: "blue-dark", class: "bg-blue-700"},
    {value: "green", class: "bg-green-600"},
    {value: "stone", class: "bg-stone-400"},
    {value: "blue", class: "bg-blue-500"},
];

interface CreateStatusDialogProps {
    trigger?: React.ReactNode;
}

// Hook to detect if we're on mobile - optimized to prevent unnecessary re-renders
function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(() => {
        // Initialize with correct value to prevent hydration mismatch
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768;
        }
        return false;
    });

    React.useEffect(() => {
        const checkIsMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(prev => prev !== mobile ? mobile : prev); // Only update if different
        };

        // Add debounce to prevent excessive re-renders
        let timeoutId: NodeJS.Timeout;
        const debouncedCheck = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkIsMobile, 100);
        };

        window.addEventListener('resize', debouncedCheck);
        return () => {
            window.removeEventListener('resize', debouncedCheck);
            clearTimeout(timeoutId);
        };
    }, []);

    return isMobile;
}

export function CreateStatusDialog({trigger}: CreateStatusDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState<string>("red");
    const [inputValue, setInputValue] = React.useState("");
    const addStatus = useStatusStore((state) => state.addStatus);
    const isMobile = useIsMobile();
    const {t} = useTranslation();

    // Reset form when dialog closes
    const handleOpenChange = React.useCallback((newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setInputValue("");
            setSelectedColor("red");
        }
    }, []);

    const onSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue.trim()) {
            addStatus({
                title: inputValue.trim(),
                color: selectedColor,
            });
            setOpen(false);
            setInputValue("");
            setSelectedColor("red");
        }
    }, [inputValue, selectedColor, addStatus]);

    const handleColorSelect = React.useCallback((colorValue: string) => {
        setSelectedColor(colorValue);
    }, []);

    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    // Memoize FormContent to prevent unnecessary re-renders
    const FormContent = React.useMemo(() => (
        <div className="px-6 pb-6 space-y-4">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">{t('dialogs.createStatus.statusTitle')}</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder={t('dialogs.createStatus.statusTitlePlaceholder')}
                        value={inputValue}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="grid gap-2 my-3">
                    <Label>{t('dialogs.createStatus.selectColor')}</Label>
                    <div className="flex flex-wrap justify-between gap-3">
                        {colors.map((c) => (
                            <div
                                key={c.value}
                                className={cn(
                                    "flex justify-center items-center h-8 w-8 rounded-md border-2",
                                    selectedColor === c.value
                                        ? "border-red-600"
                                        : "border-transparent"
                                )}
                            >
                                <div
                                    onClick={() => handleColorSelect(c.value)}
                                    className={cn(
                                        "h-7 w-7 rounded-md cursor-pointer",
                                        c.class,
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full text-white mt-3">
                    {t('dialogs.createStatus.createButton')}
                </Button>
            </form>
        </div>
    ), [inputValue, selectedColor, onSubmit, handleInputChange, handleColorSelect, t]);

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetTrigger asChild>
                    {trigger || <Button>New Status</Button>}
                </SheetTrigger>

                <SheetContent side="bottom" className="h-auto">
                    <div className="relative px-6 py-4">
                        <div className="flex justify-between items-center">
                            <SheetTitle className="text-lg">{t('dialogs.createStatus.title')}</SheetTitle>
                            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                    {FormContent}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || <Button>New Status</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
                <div className="relative px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg">{t('dialogs.createStatus.title')}</DialogTitle>
                    </DialogHeader>
                </div>
                {FormContent}
            </DialogContent>
        </Dialog>
    );
}