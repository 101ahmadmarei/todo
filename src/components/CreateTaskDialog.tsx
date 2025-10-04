import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useTaskStore, type Task} from "@/store/taskStore";
import {useStatusStore} from "@/store/statusStore";
import {useTranslation} from "@/locales/useTranslation.ts";
import {useLanguage} from "@/components/language-provider.tsx";
import useIsMobile from "@/hooks/useIsMobile.ts";
import {type FormEvent, type ReactNode, useEffect, useState} from "react";


interface CreateTaskDialogProps {
    trigger?: ReactNode;
    editMode?: boolean;
    editTask?: Task;
    onClose?: () => void;
}

function CreateTaskDialog({trigger, editMode = false, editTask, onClose}: CreateTaskDialogProps) {
    const [open, setOpen] = useState(editMode || false);
    const {addTask, updateTask} = useTaskStore();
    const statuses = useStatusStore((state) => state.statuses);
    const isMobile = useIsMobile();
    const {t} = useTranslation();
    const {language} = useLanguage()
    const isRTL = language === 'ar'


    // Helper function to get status color class
    const getStatusColorClass = (color: string): string => {
        const colorMap: Record<string, string> = {
            'red': 'bg-red-500',
            'purple': 'bg-purple-500',
            'blue-light': 'bg-blue-300',
            'blue-dark': 'bg-blue-700',
            'green': 'bg-green-600',
            'stone': 'bg-stone-400',
        };
        return colorMap[color] || 'bg-blue-500';
    };

    useEffect(() => {
        if (editMode) {
            setOpen(true);
        }
    }, [editMode]);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get("title") as string;
        const description = fd.get("description") as string;
        const status = fd.get("status") as string;

        if (title.trim() && status) {
            if (editMode && editTask) {
                updateTask(editTask.id, {
                    title: title.trim(),
                    description: description || "",
                    status: status,
                });
            } else {
                addTask({
                    title: title.trim(),
                    description: description || "",
                    status: status,
                    starred: false,
                });
            }
            handleClose();
        }
    }

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const FormContent = () => (
        <form className=" md:px-6 md:pb-6 pt-4 space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="title">{t('dialogs.createTask.taskTitle')}</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={editMode && editTask ? editTask.title : ""}
                    placeholder={editMode ? t('dialogs.createTask.editTaskTitlePlaceholder') : t('dialogs.createTask.taskTitlePlaceholder')}
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">{t('dialogs.createTask.description')}</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={editMode && editTask ? editTask.description : ""}
                    placeholder={t('dialogs.createTask.descriptionPlaceholder')}
                    className="min-h-[160px]"
                />
            </div>

            <div className="grid gap-2">
                <Label>{t('dialogs.createTask.status')}</Label>
                <Select
                    defaultValue={editMode && editTask ? editTask.status : undefined}
                    name="status"
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    <SelectTrigger id="status">
                        <SelectValue placeholder={t('dialogs.createTask.statusPlaceholder')}/>
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.length > 0 ? (
                            statuses.map((status) => (
                                <SelectItem key={status.id} value={status.id.toString()}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-3 h-3 rounded-full ${getStatusColorClass(status.color)}`}></div>
                                        {status.title}
                                    </div>
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="no-status" disabled>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                    {t('dialogs.createStatus.noStatusesAvailable')}
                                </div>
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full text-white">
                {editMode ? t('dialogs.createTask.updateButton') : t('dialogs.createTask.createButton')}
            </Button>
        </form>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={editMode ? handleClose : setOpen}>
                {trigger && (
                    <SheetTrigger asChild>
                        {trigger}
                    </SheetTrigger>
                )}

                <SheetContent side="bottom" className="h-auto">
                    <div className="relative px-6 py-4">
                        <SheetHeader className="m-0">
                            <SheetTitle className="text-lg">
                                {editMode ? t('dialogs.createTask.editTitle') : t('dialogs.createTask.title')}
                            </SheetTitle>
                        </SheetHeader>
                    </div>
                    <FormContent/>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={editMode ? handleClose : setOpen}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="relative  px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg">
                            {editMode ? t('dialogs.createTask.editTitle') : t('dialogs.createTask.title')}
                        </DialogTitle>
                    </DialogHeader>
                </div>
                <FormContent/>
            </DialogContent>
        </Dialog>
    );
}

export default CreateTaskDialog