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

// Hook to detect if we're on mobile
function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return isMobile;
}

export function CreateStatusDialog({trigger}: CreateStatusDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState<string>("red");
    const addStatus = useStatusStore((state) => state.addStatus);
    const isMobile = useIsMobile();

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get("title") as string;

        if (title.trim()) {
            addStatus({
                title: title.trim(),
                color: selectedColor,
            });
            setOpen(false);
            setSelectedColor("red");
            e.currentTarget.reset();
        }
    }

    const FormContent = () => (
        <form className="md:px-6 md:pb-6 space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="title">Status title</Label>
                <Input id="title" name="title" defaultValue="Done" required/>
            </div>

            <div className="grid gap-2 my-3">
                <Label>Select Color</Label>
                <div className="flex flex-wrap justify-between gap-3">
                    {colors.map((c) => (
                        <div
                            key={c.value}
                            className={cn(
                                selectedColor === c.value
                                    ? "border-red-600 flex justify-center items-center h-8 w-8 rounded-md border-2"
                                    : "border-transparent"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedColor(c.value)}
                                className={cn(
                                    "h-7 w-7 rounded-md border-2",
                                    c.class,
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Button type="submit" className="w-full text-white mt-3" variant="destructive">
                Create
            </Button>
        </form>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    {trigger || <Button>New Status</Button>}
                </SheetTrigger>

                <SheetContent side="bottom" className="h-auto">
                    <div className="relative px-6 py-4">
                        <SheetHeader className="m-0">
                            <SheetTitle className="text-lg">Create Status</SheetTitle>
                        </SheetHeader>
                    </div>
                    <FormContent/>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>New Status</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
                <div className="relative px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg">Create Status</DialogTitle>
                    </DialogHeader>
                </div>
                <FormContent/>
            </DialogContent>
        </Dialog>
    );
}