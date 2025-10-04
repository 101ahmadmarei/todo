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
import {useTranslation} from "@/locales/useTranslation.ts";
import useIsMobile from "@/hooks/useIsMobile.ts";
import {type ChangeEvent, type FormEvent, type ReactNode, useCallback, useMemo, useState} from "react";

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
    trigger?: ReactNode;
}


export function CreateStatusDialog({trigger}: CreateStatusDialogProps) {
    const [open, setOpen] =
        useState(false);
    const [selectedColor, setSelectedColor] = useState<string>("red");
    const [inputValue, setInputValue] = useState("");
    const addStatus = useStatusStore((state) => state.addStatus);
    const isMobile = useIsMobile();
    const {t} = useTranslation();

    const handleOpenChange = useCallback((newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setInputValue("");
            setSelectedColor("red");
        }
    }, []);

    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
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

    const handleColorSelect = useCallback((colorValue: string) => {
        setSelectedColor(colorValue);
    }, []);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    const FormContent = useMemo(() => (
        <div className="md:px-6 md:pb-6 space-y-4">
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
                                    "flex justify-center items-center p-1 rounded-lg border-2",
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
                        <SheetHeader className="m-0">
                            <SheetTitle className="text-lg">{t('dialogs.createStatus.title')}</SheetTitle>
                        </SheetHeader>
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

            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
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