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

// Mock data
const tasks = Array.from({length: 7}, (_, i) => ({
    id: i + 1,
    title: "Design landing Page",
    description: "flfasdmfsdmfmsdlvm, xcmv.mxc.vmx.vmx...",
    status: "In Progress",
}))

export default function TaskTable() {
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
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell className="text-left">
                                <span className="text-primary">★</span>
                            </TableCell>
                            <TableCell className="font-medium text-left">
                                {task.title}
                            </TableCell>
                            <TableCell className="text-left">
                                {task.description}
                            </TableCell>
                            <TableCell className="text-left">
                                <Badge
                                    variant="secondary"
                                    className="bg-purple-100 text-purple-700"
                                >
                                    {task.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">⋮</TableCell>
                        </TableRow>
                    ))}
                </TableBody> </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <Button variant="outline" size="sm">
                    ← Previous
                </Button>
                <span className="text-sm text-muted-foreground">1-7 of 120</span>
                <Button variant="outline" size="sm">
                    Next →
                </Button>
            </div>
        </div>
    )
}