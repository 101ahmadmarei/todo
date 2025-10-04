import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {useTranslation} from "@/locales/useTranslation.ts";
import useIsMobile from "@/hooks/useIsMobile.ts";

type DeleteType = 'task' | 'status';

interface GenericDeleteDialogProps {
    type: DeleteType;
    id: string | number;
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: (id: string | number) => void;
}

export function GenericDeleteDialog({
                                        type,
                                        id,
                                        title,
                                        open,
                                        onOpenChange,
                                        onDelete
                                    }: GenericDeleteDialogProps) {
    const isMobile = useIsMobile();
    const {t} = useTranslation();

    const handleDelete = () => {
        onDelete(id);
        onOpenChange(false);
    };

    // Get the appropriate translation keys based on type
    const getTranslationKey = (key: string) => {
        return type === 'task' ? `dialogs.deleteTask.${key}` : `dialogs.deleteStatus.${key}`;
    };

    const ContentBody = () => (
        <div className="md:px-6 md:pb-6 space-y-6 text-center">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-3">
                    {t(getTranslationKey('warningTitle'))}<br/>
                    "{title}" {t(getTranslationKey('warningTitle2'))}
                </h3>

                <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{t(getTranslationKey('warningMessage'))}</p>
                    <p>{t(getTranslationKey('warningMessage2'))}</p>
                </div>
            </div>

            <Button
                onClick={handleDelete}
                className="w-full text-white"
            >
                {t(getTranslationKey('deleteButton'))}
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="bottom" className="h-auto">
                    <div className="relative px-6 py-4">
                        <SheetHeader className="m-0">
                            <SheetTitle>{t(getTranslationKey('title'))}</SheetTitle>
                        </SheetHeader>
                    </div>
                    <ContentBody/>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <div className="relative px-6 py-4">
                    <DialogHeader className="m-0">
                        <DialogTitle>{t(getTranslationKey('title'))}</DialogTitle>
                    </DialogHeader>
                </div>
                <ContentBody/>
            </DialogContent>
        </Dialog>
    );
}
