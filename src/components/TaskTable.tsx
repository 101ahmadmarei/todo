import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {useStatusStore} from "@/store/statusStore"
import {useTaskStore} from "@/store/taskStore"
import type {Task} from "@/store/taskStore"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Edit,
    Trash,
    ArrowRightLeft,
    Star,
    ArrowRight,
    ArrowLeft
} from "lucide-react"
import CreateTaskDialog from "@/components/CreateTaskDialog"
import {GenericDeleteDialog} from "@/components/GenericDeleteDialog"
import {useState} from "react"
import {useTranslation} from "@/locales/useTranslation.ts"
import {useLanguage} from "@/components/language-provider"

interface TaskTableProps {
    tasks: Task[];
}

const ITEMS_PER_PAGE = 8;

export default function TaskTable({tasks}: TaskTableProps) {
    const statuses = useStatusStore((state) => state.statuses);
    const {updateTask, removeTask} = useTaskStore();
    const {removeStatus} = useStatusStore();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<{ id: number, title: string } | null>(null);
    const [deletingStatus, setDeletingStatus] = useState<{ id: number, title: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {t} = useTranslation();
    const {language} = useLanguage();
    const isRTL = language === 'ar';

    const handleTaskDelete = (id: string | number) => {
        removeTask(Number(id));
    };

    const handleStatusDelete = (id: string | number) => {
        const statusId = Number(id);
        const tasksWithStatus = tasks.filter(task => Number(task.status) === statusId);
        tasksWithStatus.forEach(task => {
            removeTask(task.id);
        });

        removeStatus(statusId);
    };

    // Pagination calculations
    const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTasks = tasks.slice(startIndex, endIndex);
    const totalItems = tasks.length;
    const startItem = totalItems === 0 ? 0 : startIndex + 1;
    const endItem = Math.min(endIndex, totalItems);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const handleStarClick = (taskId: number, currentStarred: boolean) => {
        updateTask(taskId, {starred: !currentStarred});
    };

    const getStatusById = (statusId: string | number) => {
        return statuses.find(status => status.id === Number(statusId));
    };

    const getStatusColor = (color: string) => {
        const colorMap: Record<string, string> = {
            'red': 'bg-red-100 text-red-700',
            'purple': 'bg-purple-100 text-purple-700',
            'blue-light': 'bg-blue-100 text-blue-700',
            'blue-dark': 'bg-blue-100 text-blue-800',
            'green': 'bg-green-100 text-green-700',
            'stone': 'bg-stone-100 text-stone-700',
            'blue': 'bg-blue-100 text-blue-700',
        };
        return colorMap[color] || 'bg-gray-100 text-gray-700';
    };

    const getStatusIndicatorColor = (color: string): string => {
        const colorMap: Record<string, string> = {
            'red': 'bg-red-500',
            'purple': 'bg-purple-500',
            'blue-light': 'bg-blue-300',
            'blue-dark': 'bg-blue-700',
            'green': 'bg-green-600',
            'stone': 'bg-stone-400',
            'blue': 'bg-blue-500',
        };
        return colorMap[color] || 'bg-blue-500';
    };

    const handleStatusChange = (taskId: number, newStatusId: number) => {
        updateTask(taskId, {status: String(newStatusId)});
    };

    const handleDeleteTask = (taskId: number, taskTitle: string) => {
        setDeletingTask({id: taskId, title: taskTitle});
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };

    const handleDeleteStatus = (statusId: number, statusTitle: string) => {
        setDeletingStatus({id: statusId, title: statusTitle});
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={`w-[50px] ${isRTL ? 'text-right' : ''}`}></TableHead>
                        <TableHead className={isRTL ? 'text-right' : ''}>{t('table.title')}</TableHead>
                        <TableHead
                            className={`hidden md:table-cell ${isRTL ? 'text-right' : ''}`}>{t('table.description')}</TableHead>
                        <TableHead
                            className={`md:w-[120px] ${isRTL ? 'text-right' : ''}`}>{t('table.status')}</TableHead>
                        <TableHead className={`w-[50px] ${isRTL ? 'text-left' : 'text-right'}`}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 md:table-cell">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-4xl">👻</span>
                                    <p className="text-muted-foreground">{t('table.noTasksFound')}</p>
                                    <p className="text-sm text-muted-foreground">{t('table.noTasksMessage')}</p>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell"></TableCell>
                        </TableRow>
                    ) : (
                        currentTasks.map((task) => {
                            const taskStatus = getStatusById(task.status);
                            return (
                                <TableRow key={task.id}>
                                    <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-transparent"
                                            onClick={() => handleStarClick(task.id, task.starred || false)}
                                        >
                                            <Star
                                                className={`h-4 w-4 ${
                                                    task.starred
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-400 hover:text-yellow-400'
                                                }`}
                                            />
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        className={`font-medium text-text ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {task.title}
                                    </TableCell>
                                    <TableCell
                                        className={`max-w-[200px] hidden md:table-cell ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <div className={`truncate text-text ${isRTL ? 'text-right' : ''}`}
                                             title={task.description || t('table.noDescription')}>
                                            {task.description || t('table.noDescription')}
                                        </div>
                                    </TableCell>
                                    <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                                        {/* Mobile: Show only color dot */}
                                        <div className="md:hidden">
                                            <div
                                                className={`w-6 h-6 rounded-sm ${taskStatus ? getStatusIndicatorColor(taskStatus.color) : 'bg-blue-500'}`}
                                                title={taskStatus ? taskStatus.title : 'Unknown'}
                                            ></div>
                                        </div>

                                        {/* Desktop: Show badge with text */}
                                        <div className="hidden md:block">
                                            <Badge
                                                variant="secondary"
                                                className={`w-24 h-10 flex justify-center items-center ${taskStatus ? getStatusColor(taskStatus.color) : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {taskStatus ? taskStatus.title : 'Unknown'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className={isRTL ? 'text-left' : 'text-right'}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
                                                {/* Header for status options */}
                                                <div
                                                    className={`px-2 py-1.5 text-sm font-medium text-muted-foreground flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <ArrowRightLeft className="h-4 w-4"/>
                                                    {t('table.changeTo')}
                                                </div>

                                                {/* Status Options */}
                                                {statuses.map((status) => {
                                                    const isCurrentStatus = Number(task.status) === status.id;
                                                    const statusItemClass = `text-text ${isCurrentStatus ? 'bg-accent' : ''} ${isRTL ? 'flex-row-reverse' : ''}`;
                                                    const statusContentClass = `flex items-center gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`;

                                                    return (
                                                        <DropdownMenuItem
                                                            key={status.id}
                                                            onClick={() => handleStatusChange(task.id, status.id)}
                                                            className={statusItemClass}
                                                        >
                                                            <div className={statusContentClass}>
                                                                <div
                                                                    className={`w-4 h-4 rounded-[4px] ${getStatusIndicatorColor(status.color)}`}/>
                                                                <span className="text-text">{status.title}</span>
                                                                {isCurrentStatus && (
                                                                    <span
                                                                        className={`text-text ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                                                                        ✓
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </DropdownMenuItem>
                                                    );
                                                })}

                                                <DropdownMenuSeparator/>

                                                <DropdownMenuItem onClick={() => handleEditTask(task)}
                                                                  className={`text-text ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <Edit className="h-4 w-4"/>
                                                    <span className={isRTL ? 'mr-2' : 'ml-2'}>{t('table.edit')}</span>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteTask(task.id, task.title)}
                                                    className={`text-text ${isRTL ? 'flex-row-reverse' : ''}`}
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                    <span
                                                        className={isRTL ? 'mr-2' : 'ml-2'}>{t('table.deleteTask')}</span>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        const taskStatus = getStatusById(task.status);
                                                        if (taskStatus) {
                                                            handleDeleteStatus(taskStatus.id, taskStatus.title);
                                                        }
                                                    }}
                                                    className={`text-text ${isRTL ? 'flex-row-reverse' : ''}`}
                                                >
                                                    <Trash className="h-4 w-4"/>
                                                    <span
                                                        className={isRTL ? 'mr-2' : 'ml-2'}>{t('table.deleteStatus')}</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            {/* Edit Task Dialog */}
            {editingTask && (
                <CreateTaskDialog
                    trigger={null}
                    editMode={true}
                    editTask={editingTask}
                    onClose={() => setEditingTask(null)}
                />
            )}

            {/* Delete Task Dialog */}
            {deletingTask && (
                <GenericDeleteDialog
                    type="task"
                    id={deletingTask.id}
                    title={deletingTask.title}
                    open={!!deletingTask}
                    onOpenChange={(open) => {
                        if (!open) setDeletingTask(null);
                    }}
                    onDelete={handleTaskDelete}
                />
            )}

            {/* Delete Status Dialog */}
            {deletingStatus && (
                <GenericDeleteDialog
                    type="status"
                    id={deletingStatus.id}
                    title={deletingStatus.title}
                    open={!!deletingStatus}
                    onOpenChange={(open) => {
                        if (!open) setDeletingStatus(null);
                    }}
                    onDelete={handleStatusDelete}
                />
            )}
            {tasks.length > 0 && (
                <div className="flex items-center justify-between p-4">
                    {/* Previous Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 text-text"
                    >
                        <ArrowLeft
                            className={`h-4 w-4 transition-transform ${
                                isRTL ? "rotate-180" : ""
                            }`}
                        />
                        {t("table.previous")}
                    </Button>

                    {/* Pagination info */}
                    <span className="text-sm text-muted-foreground">
      {startItem}–{endItem} {t("table.of")} {totalItems}
    </span>

                    {/* Next Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 text-text"
                    >
                        {t("table.next")}
                        <ArrowRight
                            className={`h-4 w-4 transition-transform ${
                                isRTL ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </div>
            )}

        </div>
    )
}
