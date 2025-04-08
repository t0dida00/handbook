import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { CheckIcon, ChevronDownCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"
interface User {
    id: string;
    name: string;
    nickname: string;
    image: string;
    category: string;
    created_at: string;
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
export function Modal({ user, onClose }: { user: User; onClose: () => void }) {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        undefined,
    );
    const onCopy = async () => {
        try {
            if (selectedValue) {
                await navigator.clipboard.writeText(selectedValue);
            } else {
                toast.error("No value selected to copy"); // Use toast.error for errors
            }
            toast.success("Copied the link successfully"); // Use toast.success for success
        } catch (error) {
            toast.error("Failed to copy the link"); // Use toast.error for errors
        }
    }
    return (
        <Dialog open={!!user} onOpenChange={() => onClose()} >
            <DialogContent className="sm:max-w-[600px]  bg-white text-black dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                    <DialogTitle>Personal Information</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="flex flex-row  gap-10 items-start ">
                    <div className="flex flex-col gap-4 ">
                        <Avatar className="size-40">
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback className="flex items-center justify-center rounded-full bg-gray-200 text-center text-sm text-gray-600">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col whitespace-nowrap">
                            <h1 className="text-2xl font-bold ">
                                {user?.name}
                            </h1>
                            <h2 className="text-lg font-semibold  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {user?.nickname}
                            </h2>
                            <h3 className="text-[14px] font-normal opacity-40 whitespace-nowrap">
                                Added at: {new Date(user?.created_at).toLocaleDateString("en-GB")}
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full justify-between h-full">
                        <div className="flex flex-col gap-4 w-full">
                            {Object.entries(user.contacts).map(([key, value]) => {
                                if (value === "") return null;
                                return (
                                    <div className="w-fit" key={key}>
                                        <a
                                            href={value || "#"}
                                            title={key}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <div className="flex flex-row gap-2 items-center">
                                                <img src={`./icons/${key}.svg`} alt={key} className="w-6 h-6" /> {value}
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Select onValueChange={(value) => setSelectedValue(value)}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Choose a link to copy" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-black dark:bg-gray-800 dark:text-white">
                                    {Object.entries(user.contacts).map(([key, value]) => {
                                        if (value === "") return null;
                                        return (
                                            <SelectItem value={value} key={key}> {key.charAt(0).toUpperCase() + key.slice(1)}</SelectItem>
                                        )
                                    })}

                                </SelectContent>
                            </Select>
                            {/* <Button variant="outline" className="w-fit dark:bg-gray-800 bg-white" >
                                Copy
                            </Button> */}

                            <AnimatedSubscribeButton
                                className={`w-fit border border-[#e5e7eb] bg-[#18181B] text-white rounded-md dark:bg-inherit ${selectedValue ? '' : '!opacity-50 pointer-events-none '}`}
                                onClick={() => onCopy()}
                            >

                                <span className="group inline-flex items-center hover:opacity-50 duration-300" >
                                    Copy
                                </span>
                                <span className="group inline-flex items-center">
                                    <CheckIcon className="mr-2 size-4" />
                                    Copied
                                </span>
                            </AnimatedSubscribeButton>


                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}