"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {useTaskStore} from "@/store/taskStore";

interface DeleteTaskDialogProps {
    taskId: string;
    taskTitle: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteTaskDialog({
                                     taskId,
                                     taskTitle,
                                     open,
                                     onOpenChange
                                 }: DeleteTaskDialogProps) {
    const removeTask = useTaskStore((state) => state.removeTask);

    const handleDelete = () => {
        removeTask(taskId);
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="relative px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg">Delete Task</DialogTitle>
                    </DialogHeader>


                </div>

                <div className="px-6 pb-6 pt-4 space-y-6 text-center">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-destructive">
                            Beware! You're About to Erase the<br/>
                            "{taskTitle}" Task! 👻
                        </h3>

                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>This task will vanish into the void forever...</p>
                            <p>Once it's gone, there's no bringing it back!</p>
                        </div>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="flex-1 text-white"
                        >
                            Delete the Task
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
