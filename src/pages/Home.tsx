import TaskTable from "@/components/TaskTable.tsx";
import TaskTableHeader from "@/components/TableHeader.tsx";
import {Button} from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import {CreateStatusDialog} from "@/components/CreateStatusDialog.tsx";
import {useStatusStore} from "@/store/statusStore";
import {CreateTaskDialog} from "@/components/CreateTaskDialog.tsx";

export default function Home() {
    const statuses = useStatusStore((state) => state.statuses);
    const hasStatuses = statuses.length > 0;

    return (
        <div>
            <Navbar/>

            {!hasStatuses ? (
                <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-3 gap-4">
                    <img src="/src/assets/ghost-3.png" alt="Ghost"/>
                    <p className="text-xl font-bold">
                        Uh-oh... It's Empty in Here!
                    </p>
                    <p className="text-subtext leading-tight">
                        Looks like all your statuses have vanished into the abyss! <br/>
                        Create a new one before the ghosts take over...
                    </p>
                    <CreateStatusDialog
                        trigger={
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2">
                                👻 Create New Status
                            </Button>
                        }
                    />
                </div>
            ) : (
                <div className="container px-3 mx-auto flex flex-1 items-center justify-center bg-background">
                    <div className="w-full mt-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Your Statuses</h1>
                            <CreateTaskDialog
                                trigger={
                                    <Button className="bg-primary hover:bg-primary/90 text-white">
                                        Create New Task
                                    </Button>
                                }
                            />
                        </div>
                        <TaskTableHeader/>
                        <TaskTable/>
                    </div>
                </div>
            )}
        </div>
    );
}
