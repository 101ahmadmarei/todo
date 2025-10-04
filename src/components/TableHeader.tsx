import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useStatusStore} from "@/store/statusStore.ts";
import {CreateStatusDialog} from "@/components/CreateStatusDialog.tsx";
import {CircleFadingPlus} from "lucide-react";
import * as React from "react";

interface TaskTableHeaderProps {
    onStatusChange?: (statusId: string) => void;
    onSearchChange?: (searchTerm: string) => void;
}

export default function TaskTableHeader({onStatusChange, onSearchChange}: TaskTableHeaderProps) {
    const statuses = useStatusStore((state) => state.statuses);

    const handleStatusChange = (value: string) => {
        onStatusChange?.(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange?.(e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Left: Search + Status + Create Status Button */}
            <div className="flex flex-col md:flex-row flex-1 gap-2 w-full sm:w-auto">
                {/* Search Input */}
                <Input
                    type="search"
                    placeholder="Search..."
                    className="flex-1 "
                    onChange={handleSearchChange}
                />

                {/* Status Select */}
                <Select defaultValue="status" onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full md:w-[160px]">
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="status">Status</SelectItem>
                        {statuses.map((status) => (
                            <SelectItem key={status.id} value={status.id}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${
                                        status.color === 'red' ? 'bg-red-500' :
                                            status.color === 'purple' ? 'bg-purple-500' :
                                                status.color === 'blue-light' ? 'bg-blue-300' :
                                                    status.color === 'blue-dark' ? 'bg-blue-700' :
                                                        status.color === 'green' ? 'bg-green-600' :
                                                            status.color === 'stone' ? 'bg-stone-400' :
                                                                'bg-blue-500'
                                    }`}></div>
                                    {status.title}
                                </div>
                            </SelectItem>
                        ))}
                        <CreateStatusDialog
                            trigger={
                                <div
                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                    <div className="flex items-center gap-2">
                                        <CircleFadingPlus className="w-4 h-4"/>
                                        Create Status
                                    </div>
                                </div>
                            }
                        />
                    </SelectContent>
                </Select>
            </div>

            {/* Right: Create New Task Button */}

        </div>
    )
}