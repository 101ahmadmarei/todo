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
import {DeleteStatusDialog} from "@/components/DeleteStatusDialog.tsx";
import {Button} from "@/components/ui/button";
import {CircleFadingPlus, Trash2} from "lucide-react";
import {useState} from "react";

interface TaskTableHeaderProps {
    onStatusChange?: (statusId: string) => void;
    onSearchChange?: (searchTerm: string) => void;
}

export default function TaskTableHeader({onStatusChange, onSearchChange}: TaskTableHeaderProps) {
    const statuses = useStatusStore((state) => state.statuses);
    const [deletingStatus, setDeletingStatus] = useState<{ id: string, title: string } | null>(null);

    const handleStatusChange = (value: string) => {
        onStatusChange?.(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange?.(e.target.value);
    };

    const handleDeleteStatus = (statusId: string, statusTitle: string) => {
        setDeletingStatus({id: statusId, title: statusTitle});
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex flex-1 gap-2 w-full sm:w-auto">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="flex-1"
                    onChange={handleSearchChange}
                />

                <Select defaultValue="status" onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="status">Status</SelectItem>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map((status) => (
                            <SelectItem key={status.id} value={status.id}>
                                <div className="flex items-center gap-2 w-full">
                                    <div className={`w-3 h-3 rounded-full ${
                                        status.color === 'red' ? 'bg-red-500' :
                                            status.color === 'purple' ? 'bg-purple-500' :
                                                status.color === 'blue-light' ? 'bg-blue-300' :
                                                    status.color === 'blue-dark' ? 'bg-blue-700' :
                                                        status.color === 'green' ? 'bg-green-600' :
                                                            status.color === 'stone' ? 'bg-stone-400' :
                                                                'bg-blue-500'
                                    }`}></div>
                                    <span className="flex-1">{status.title}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteStatus(status.id, status.title);
                                        }}
                                        className="ml-auto p-1 hover:bg-red-100 rounded transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3 text-red-600"/>
                                    </button>
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

            {deletingStatus && (
                <DeleteStatusDialog
                    statusId={deletingStatus.id}
                    statusTitle={deletingStatus.title}
                    open={!!deletingStatus}
                    onOpenChange={(open) => {
                        if (!open) setDeletingStatus(null);
                    }}
                />
            )}
        </div>
    )
}