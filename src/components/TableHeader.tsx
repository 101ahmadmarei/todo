import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function TaskTableHeader() {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Left: Search + Status */}
            <div className="flex flex-1 gap-2 w-full sm:w-auto">
                {/* Search Input */}
                <Input
                    type="search"
                    placeholder="Search..."
                    className="flex-1"
                />

                {/* Status Select */}
                <Select>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Right: Create New Task Button */}

        </div>
    )
}