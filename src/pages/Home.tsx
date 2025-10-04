import TaskTable from "@/components/TaskTable.tsx";
import TaskTableHeader from "@/components/TableHeader.tsx";
import {Button} from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import {CreateStatusDialog} from "@/components/CreateStatusDialog.tsx";
import {useStatusStore} from "@/store/statusStore";
import {CreateTaskDialog} from "@/components/CreateTaskDialog.tsx";
import {useTaskStore} from "@/store/taskStore";
import {useState, useMemo} from "react";
import {useTranslation} from "@/locales/useTranslation.ts";

export default function Home() {
    const statuses = useStatusStore((state) => state.statuses);
    const tasks = useTaskStore((state) => state.tasks);
    const hasStatuses = statuses.length > 0;
    const {t} = useTranslation();

    const [selectedStatus, setSelectedStatus] = useState<string>("status");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        if (selectedStatus !== "status") {
            filtered = filtered.filter(task => task.status === selectedStatus);
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchLower) ||
                task.description.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [tasks, selectedStatus, searchTerm]);

    const handleStatusChange = (statusId: string) => {
        setSelectedStatus(statusId);
    };

    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    return (
        <div>
            <Navbar/>

            {!hasStatuses ? (
                <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-3 gap-4">
                    <img src="/src/assets/ghost-3.png" alt="Ghost"/>
                    <p className="text-xl mt-4 font-bold">
                        {t('home.emptyStatusTitle')}
                    </p>
                    <p className="text-subtext leading-2xl">
                        {t('home.emptyStatusMessage')} <br/>
                        {t('home.emptyStatusMessage2')}
                    </p>
                    <CreateStatusDialog
                        trigger={
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2">
                                {t('home.createNewStatus')}
                            </Button>
                        }
                    />
                </div>
            ) : (
                <div className="container px-3 mx-auto flex flex-1 items-center justify-center bg-background">
                    <div className="w-full mt-8 space-y-6">
                        <div className="flex justify-end items-center">
                            <CreateTaskDialog
                                trigger={
                                    <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
                                        {t('home.createNewTask')}
                                    </Button>
                                }
                            />
                        </div>
                        <TaskTableHeader
                            onStatusChange={handleStatusChange}
                            onSearchChange={handleSearchChange}
                        />
                        <TaskTable tasks={filteredTasks}/>
                    </div>
                </div>
            )}
        </div>
    );
}
