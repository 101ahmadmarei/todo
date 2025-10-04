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
import {useStatusStore} from "@/store/statusStore";

interface DeleteStatusDialogProps {
    statusId: string;
    statusTitle: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteStatusDialog({
                                       statusId,
                                       statusTitle,
                                       open,
                                       onOpenChange
                                   }: DeleteStatusDialogProps) {
    const removeStatus = useStatusStore((state) => state.removeStatus);

    const handleDelete = () => {
        removeStatus(statusId);
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="relative border-b px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg text-center">Delete Status</DialogTitle>
                    </DialogHeader>
                </div>

                <div className="px-6 pb-6 pt-4 space-y-6 text-center">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-destructive">
                            Beware! You're About to Erase the<br/>
                            "{statusTitle}" Status! 👻
                        </h3>

                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>All tasks in this status will vanish into the void forever...</p>
                            <p>Once they're gone, there's no bringing them back!</p>
                        </div>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="flex-1 text-white"
                        >
                            Delete the Status
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
