import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useStatusStore} from "@/store/statusStore.ts"
import {useTaskStore} from "@/store/taskStore.ts"
import {CreateStatusDialog} from "@/components/CreateStatusDialog.tsx"
import {DeleteStatusDialog} from "@/components/DeleteStatusDialog.tsx"
import {CircleFadingPlus, Search} from "lucide-react"
import {useState} from "react"
import {useTranslation} from "@/hooks/useTranslation"
import {useLanguage} from "@/components/language-provider"

interface TaskTableHeaderProps {
    onStatusChange?: (statusId: string) => void
    onSearchChange?: (searchTerm: string) => void
}

export default function TaskTableHeader({
                                            onStatusChange,
                                            onSearchChange,
                                        }: TaskTableHeaderProps) {
    const statuses = useStatusStore((state) => state.statuses)
    const tasks = useTaskStore((state) => state.tasks)
    const [deletingStatus, setDeletingStatus] = useState<{
        id: string
        title: string
    } | null>(null)
    const {t} = useTranslation()
    const {language} = useLanguage()
    const isRTL = language === 'ar'

    const handleStatusChange = (value: string) => {
        onStatusChange?.(value)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange?.(e.target.value)
    }

    // Count tasks for a specific status
    const getTaskCountForStatus = (statusId: string) =>
        tasks.filter((task) => task.status === statusId).length

    // Map status color name → Tailwind class
    const getColorClass = (color: string) => {
        switch (color) {
            case "red":
                return "bg-red-500"
            case "purple":
                return "bg-purple-500"
            case "blue-light":
                return "bg-blue-300"
            case "blue-dark":
                return "bg-blue-700"
            case "green":
                return "bg-green-600"
            case "stone":
                return "bg-stone-400"
            default:
                return "bg-blue-500"
        }
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1 w-full md:w-auto">
                    <Search
                        className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 ${
                            isRTL ? 'right-3' : 'left-3'
                        }`}
                    />
                    <Input
                        type="search"
                        placeholder={t('header.searchPlaceholder')}
                        className={`flex-1 ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Status Select */}
                <Select
                    dir={isRTL ? 'rtl' : 'ltr'}
                    onValueChange={handleStatusChange}>
                    <SelectTrigger className={`w-full md:w-[180px] `}>
                        <SelectValue placeholder={t('header.statusPlaceholder')}/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="status" className="text-subtext">{t('header.allStatuses')}</SelectItem>

                        {statuses.map((status) => {
                            const taskCount = getTaskCountForStatus(status.id)
                            return (
                                <SelectItem key={status.id} value={status.id}>
                                    <div className="flex items-center gap-2 justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-4 h-4 rounded-sm ${getColorClass(
                                                    status.color
                                                )}`}
                                            ></div>
                                            <span>{status.title}</span>
                                        </div>
                                        <div
                                            className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full min-w-[22px] text-center">
                                            {taskCount}
                                        </div>
                                    </div>
                                </SelectItem>
                            )
                        })}
                        <CreateStatusDialog
                            trigger={
                                <div
                                    className=" relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                                    <div className="flex items-center gap-2">
                                        <CircleFadingPlus className="w-4 h-4"/>
                                        {t('header.createStatus')}
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
                        if (!open) setDeletingStatus(null)
                    }}
                />
            )}
        </div>
    )
}