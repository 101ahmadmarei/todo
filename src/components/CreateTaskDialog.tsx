// app/components/create-task-dialog.tsx
"use client";

import * as React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog";
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
import {X} from "lucide-react";
import {useTaskStore} from "@/store/taskStore";
import {useStatusStore} from "@/store/statusStore";

interface CreateTaskDialogProps {
    trigger?: React.ReactNode;
}

export function CreateTaskDialog({trigger}: CreateTaskDialogProps) {
    const [open, setOpen] = React.useState(false);
    const addTask = useTaskStore((state) => state.addTask);
    const statuses = useStatusStore((state) => state.statuses);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get("title") as string;
        const description = fd.get("description") as string;
        const status = fd.get("status") as string;

        if (title.trim()) {
            addTask({
                title: title.trim(),
                description: description || "",
                status: status || "todo",
            });
            setOpen(false);
            e.currentTarget.reset();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>New Task</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                {/* Header */}
                <div className="relative border-b px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle className="text-lg">Create Task</DialogTitle>
                    </DialogHeader>


                </div>

                {/* Body */}
                <form className="px-6 pb-6 pt-4 space-y-4" onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="title">Task title</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue="Kill the Boss"
                            placeholder="Task title"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Type something ..."
                            className="min-h-[96px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select defaultValue={statuses.length > 0 ? statuses[0].id : "no-status"} name="status">
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select Status"/>
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.length > 0 ? (
                                    statuses.map((status) => (
                                        <SelectItem key={status.id} value={status.id}>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${status.color === 'red' ? 'bg-red-500' :
                                                        status.color === 'purple' ? 'bg-purple-500' :
                                                            status.color === 'blue-light' ? 'bg-blue-300' :
                                                                status.color === 'blue-dark' ? 'bg-blue-700' :
                                                                    status.color === 'green' ? 'bg-green-600' :
                                                                        status.color === 'stone' ? 'bg-stone-400' :
                                                                            'bg-blue-500'}`}></div>
                                                {status.title}
                                            </div>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-status" disabled>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                            No statuses available - Create one first
                                        </div>
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Footer */}
                    <Button type="submit" className="w-full text-white" variant="destructive">
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}