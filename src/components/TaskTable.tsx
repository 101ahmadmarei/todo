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
import {useTaskStore} from "@/store/taskStore"
import {useStatusStore} from "@/store/statusStore"

export default function TaskTable() {
    const tasks = useTaskStore((state) => state.tasks);
    const statuses = useStatusStore((state) => state.statuses);

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

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12">
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-4xl">👻</span>
                                    <p className="text-muted-foreground">No tasks created yet</p>
                                    <p className="text-sm text-muted-foreground">Create your first task to get
                                        started!</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        tasks.map((task) => {
                            const taskStatus = getStatusById(task.status);
                            return (
                                <TableRow key={task.id}>
                                    <TableCell className="text-left">
                                        <span className="text-primary">★</span>
                                    </TableCell>
                                    <TableCell className="font-medium text-left">
                                        {task.title}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {task.description || "No description"}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <Badge
                                            variant="secondary"
                                            className={taskStatus ? getStatusColor(taskStatus.color) : 'bg-gray-100 text-gray-700'}
                                        >
                                            {taskStatus ? taskStatus.title : 'Unknown'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">⋮</TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            {tasks.length > 0 && (
                <div className="flex justify-between items-center p-4">
                    <Button variant="outline" size="sm">
                        ← Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">1-{tasks.length} of {tasks.length}</span>
                    <Button variant="outline" size="sm">
                        Next →
                    </Button>
                </div>
            )}
        </div>
    )
}