"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {useTaskStore} from "@/store/taskStore";
import {useTranslation} from "@/hooks/useTranslation";

interface DeleteTaskDialogProps {
    taskId: string;
    taskTitle: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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

export function DeleteTaskDialog({
                                     taskId,
                                     taskTitle,
                                     open,
                                     onOpenChange
                                 }: DeleteTaskDialogProps) {
    const removeTask = useTaskStore((state) => state.removeTask);
    const isMobile = useIsMobile();
    const {t} = useTranslation();

    const handleDelete = () => {
        removeTask(taskId);
        onOpenChange(false);
    };

    const ContentBody = () => (
        <div className="md:px-6 md:pb-6 space-y-6 text-center">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold ">
                    {t('dialogs.deleteTask.warningTitle')}<br/>
                    "{taskTitle}" {t('dialogs.deleteTask.warningTitle2')}
                </h3>

                <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{t('dialogs.deleteTask.warningMessage')}</p>
                    <p>{t('dialogs.deleteTask.warningMessage2')}</p>
                </div>
            </div>

            <Button
                onClick={handleDelete}
                className="w-full text-white"
            >
                {t('dialogs.deleteTask.deleteButton')}
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="bottom" className="h-auto">
                    <div className="relative px-6 py-4">
                        <SheetHeader className="m-0">
                            <SheetTitle>{t('dialogs.deleteTask.title')}</SheetTitle>
                        </SheetHeader>
                    </div>
                    <ContentBody/>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="relative px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle>{t('dialogs.deleteTask.title')}</DialogTitle>
                    </DialogHeader>
                </div>
                <ContentBody/>
            </DialogContent>
        </Dialog>
    );
}
