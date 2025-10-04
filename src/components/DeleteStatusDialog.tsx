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
import {useStatusStore} from "@/store/statusStore";
import {useTaskStore} from "@/store/taskStore";
import {useTranslation} from "@/locales/useTranslation.ts";

interface DeleteStatusDialogProps {
    statusId: string;
    statusTitle: string;
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

export function DeleteStatusDialog({
                                       statusId,
                                       statusTitle,
                                       open,
                                       onOpenChange
                                   }: DeleteStatusDialogProps) {
    const removeStatus = useStatusStore((state) => state.removeStatus);
    const {tasks, removeTask} = useTaskStore();
    const isMobile = useIsMobile();
    const {t} = useTranslation();

    const handleDelete = () => {
        // Find all tasks with this status and delete them
        const tasksWithStatus = tasks.filter(task => task.status === statusId);
        tasksWithStatus.forEach(task => {
            removeTask(task.id);
        });

        // Remove the status itself
        removeStatus(statusId);
        onOpenChange(false);
    };

    const ContentBody = () => (
        <div className="md:px-6 md:pb-6   space-y-6 text-center">
            <div className="space-y-2">
                <h3 className="text-lg mb-3 font-semibold">
                    {t('dialogs.deleteStatus.warningTitle')}<br/>
                    "{statusTitle}" {t('dialogs.deleteStatus.warningTitle2')}
                </h3>

                <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{t('dialogs.deleteStatus.warningMessage')}</p>
                    <p>{t('dialogs.deleteStatus.warningMessage2')}</p>
                </div>
            </div>

            <Button
                onClick={handleDelete}
                className="text-white w-full"
            >
                {t('dialogs.deleteStatus.deleteButton')}
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="bottom" className="h-auto">
                    <div className="relative">
                        <SheetHeader>
                            <SheetTitle>{t('dialogs.deleteStatus.title')}</SheetTitle>
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
                        <DialogTitle>{t('dialogs.deleteStatus.title')}</DialogTitle>
                    </DialogHeader>
                </div>
                <ContentBody/>
            </DialogContent>
        </Dialog>
    );
}
