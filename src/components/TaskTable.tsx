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
import {MoreHorizontal, Edit, Trash, ArrowRightLeft, Star} from "lucide-react"
import {CreateTaskDialog} from "@/components/CreateTaskDialog"
import {DeleteTaskDialog} from "@/components/DeleteTaskDialog"
import {DeleteStatusDialog} from "@/components/DeleteStatusDialog"
import {useState} from "react"
import {useTranslation} from "@/hooks/useTranslation"

interface TaskTableProps {
    tasks: Task[];
}

const ITEMS_PER_PAGE = 8;

export default function TaskTable({tasks}: TaskTableProps) {
    const statuses = useStatusStore((state) => state.statuses);
    const {updateTask} = useTaskStore();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<{ id: string, title: string } | null>(null);
    const [deletingStatus, setDeletingStatus] = useState<{ id: string, title: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {t} = useTranslation();

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

    const handleStarClick = (taskId: string, currentStarred: boolean) => {
        updateTask(taskId, {starred: !currentStarred});
    };

    const getStatusById = (statusId: string) => {
        return statuses.find(status => status.id === statusId);
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

    const handleStatusChange = (taskId: string, newStatusId: string) => {
        updateTask(taskId, {status: newStatusId});
    };

    const handleDeleteTask = (taskId: string, taskTitle: string) => {
        setDeletingTask({id: taskId, title: taskTitle});
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };

    const handleDeleteStatus = (statusId: string, statusTitle: string) => {
        setDeletingStatus({id: statusId, title: statusTitle});
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>{t('table.title')}</TableHead>
                        <TableHead className="hidden md:table-cell">{t('table.description')}</TableHead>
                        <TableHead className=" md:w-[120px]">{t('table.status')}</TableHead>
                        <TableHead className="text-right w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 md:table-cell">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-4xl">👻</span>
                                    <p className="text-muted-foreground text-text">{t('table.noTasksFound')}</p>
                                    <p className="text-sm text-muted-foreground text-text">{t('table.noTasksMessage')}</p>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell"></TableCell>
                        </TableRow>
                    ) : (
                        currentTasks.map((task) => {
                            const taskStatus = getStatusById(task.status);
                            return (
                                <TableRow key={task.id}>
                                    <TableCell className="text-left">
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
                                    <TableCell className="font-medium text-left text-text">
                                        {task.title}
                                    </TableCell>
                                    <TableCell className="text-left max-w-[200px] hidden md:table-cell">
                                        <div className="truncate text-text"
                                             title={task.description || t('table.noDescription')}>
                                            {task.description || t('table.noDescription')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {/* Mobile: Show only color dot */}
                                        <div className="md:hidden">
                                            <div
                                                className={`w-6 h-6 rounded-sm ${
                                                    taskStatus?.color === 'red' ? 'bg-red-500' :
                                                        taskStatus?.color === 'purple' ? 'bg-purple-500' :
                                                            taskStatus?.color === 'blue-light' ? 'bg-blue-300' :
                                                                taskStatus?.color === 'blue-dark' ? 'bg-blue-700' :
                                                                    taskStatus?.color === 'green' ? 'bg-green-600' :
                                                                        taskStatus?.color === 'stone' ? 'bg-stone-400' :
                                                                            'bg-blue-500'
                                                }`}
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
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {/* Header for status options */}
                                                <div
                                                    className="px-2 py-1.5 text-sm font-medium text-muted-foreground flex items-center gap-2 text-text">
                                                    <ArrowRightLeft className="h-4 w-4"/>
                                                    {t('table.changeTo')}
                                                </div>

                                                {/* Status Options */}
                                                {statuses.map((status) => (
                                                    <DropdownMenuItem
                                                        key={status.id}
                                                        onClick={() => handleStatusChange(task.id, status.id)}
                                                        className={`text-text ${task.status === status.id ? 'bg-accent' : ''}`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 rounded-[4px] ${
                                                                status.color === 'red' ? 'bg-red-500' :
                                                                    status.color === 'purple' ? 'bg-purple-500' :
                                                                        status.color === 'blue-light' ? 'bg-blue-300' :
                                                                            status.color === 'blue-dark' ? 'bg-blue-700' :
                                                                                status.color === 'green' ? 'bg-green-600' :
                                                                                    status.color === 'stone' ? 'bg-stone-400' :
                                                                                        'bg-blue-500'
                                                            }`}></div>

                                                            <span className="text-text">{status.title}</span>
                                                            {task.status === status.id &&
                                                                <span className="ml-auto text-text">✓</span>}
                                                        </div>
                                                    </DropdownMenuItem>
                                                ))}

                                                <DropdownMenuSeparator/>

                                                <DropdownMenuItem onClick={() => handleEditTask(task)}
                                                                  className="text-text">
                                                    <Edit className="mr-2 h-4 w-4"/>
                                                    {t('table.edit')}
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteTask(task.id, task.title)}
                                                    className="text-text"
                                                >
                                                    <Trash className="mr-2 h-4 w-4"/>
                                                    {t('table.deleteTask')}
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        const taskStatus = getStatusById(task.status);
                                                        if (taskStatus) {
                                                            handleDeleteStatus(taskStatus.id, taskStatus.title);
                                                        }
                                                    }}
                                                    className="text-text"
                                                >
                                                    <Trash className="mr-2 h-4 w-4"/>
                                                    {t('table.deleteStatus')}
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

            {deletingTask && (
                <DeleteTaskDialog
                    taskId={deletingTask.id}
                    taskTitle={deletingTask.title}
                    open={!!deletingTask}
                    onOpenChange={(open) => {
                        if (!open) setDeletingTask(null);
                    }}
                />
            )}

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

            {tasks.length > 0 && (
                <div className="flex justify-between items-center p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-text"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        {t('table.previous')}
                    </Button>
                    <span className="text-sm text-muted-foreground text-text">
            {startItem}-{endItem} {t('table.of')} {totalItems}
          </span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-text"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        {t('table.next')}
                    </Button>
                </div>
            )}
        </div>
    )
}
