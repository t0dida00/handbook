import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilePenLine } from 'lucide-react';
import { toast } from "sonner";

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

export function UserEdition({ user }: UserEditionProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<User>(user);
    useEffect(() => {
        setFormData(user); // Update formData whenever the user prop changes
    }, [user]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        // Check if the field belongs to the 'contacts' object
        if (id.startsWith("contacts.")) {
            const contactField = id.split(".")[1]; // Extract the contact field (e.g., 'facebook')
            setFormData((prevData) => ({
                ...prevData,
                contacts: {
                    ...prevData.contacts, // Spread the previous contacts to keep other fields intact
                    [contactField]: value, // Update the specific contact field
                },
            }));
        } else {
            // If it's not a contact field, update the other fields as usual
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to an API)
        toast.success("Edit successfully", {
            description: `${user.name} has been modified successfully.`,

        })
        setOpen(false); // Close the dialog after submitting
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className=" !p-0"
                    onClick={() => setOpen(true)}
                >
                    <FilePenLine className="dark:text-neutral-200 h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white text-black dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update user details and contact information.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 py-4 items-center">
                        {/* Avatar */}
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="flex items-center justify-center rounded-full bg-gray-200 text-center text-sm text-gray-600">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        {/* Profile Fields */}
                        <div className="w-full space-y-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nickname" className="text-right">Nickname</Label>
                                <Input
                                    id="nickname"
                                    value={formData.nickname}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="w-full space-y-4">
                            {Object.entries(formData.contacts).map(([key, value]) => (
                                <div key={key} className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={key} className="text-right flex items-center gap-2">
                                        <img src={`./icons/${key}.svg`} alt={key} className="w-5 h-5" />
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Label>
                                    <Input
                                        id={`contacts.${key}`}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <DialogFooter className="flex w-full sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="hover:opacity-50 transition-opacity duration-200" onClick={() => setOpen(false)}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="outline" className="hover:opacity-50 transition-opacity duration-200 bg-[#18181B] text-white dark:bg-inherit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
