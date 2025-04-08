import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
interface User {
    id: string;
    name: string;
    nickname: string;
    image: string;
    category: string;
    contacts: {
        facebook: string;
        instagram: string;
        whatsapp: string;
        telegram: string;
        email: string;
        phone: string;
        linkedin: string;
    };
}
interface UserEditionProps {
    user: User;
}

export function DeleteButton({ user }: UserEditionProps) {

    const onDelete = () => {
        toast("Deleted successfully", {
            description: `${user.name} has been deleted `,

        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" >
                    <Trash2 className='dark:text-neutral-200' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md bg-white text-black dark:bg-gray-800 dark:text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row sm:justify-between">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 text-white" onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
