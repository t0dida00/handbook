import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BlurFade } from './magicui/blur-fade';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Reorder } from "framer-motion";

const initialFilters = {
    group: ["general", "work", "chillout"],
    platform: [
        { id: "facebook", name: "Facebook", icon: "/icons/facebook.svg" },
        { id: "instagram", name: "Instagram", icon: "/icons/instagram.svg" },
        { id: "whatsapp", name: "Whatsapp", icon: "/icons/whatsapp.svg" },
        { id: "telegram", name: "Telegram", icon: "/icons/telegram.svg" },
        { id: "email", name: "Email", icon: "/icons/email.svg" },
        { id: "linkedin", name: "Linkedin", icon: "/icons/linkedin.svg" },
    ],
};

interface SidebarProps {
    onFilterChange: (filters: { group: string[]; platform: string[] }) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [selectedFilters, setSelectedFilters] = useState<{ group: string[]; platform: string[] }>({
        group: [],
        platform: [],
    });
    const handleFilterChange = (category: "group" | "platform", id: string) => {
        const newFilters = {
            ...selectedFilters,
            [category]: selectedFilters[category].includes(id)
                ? selectedFilters[category].filter((item) => item !== id)
                : [...selectedFilters[category], id],
        };
        setSelectedFilters(newFilters);  // Update local state
        onFilterChange(newFilters);

    };

    const clearSelections = (category: "group" | "platform") => {
        const newFilters = { ...selectedFilters, [category]: [] };
        setSelectedFilters(newFilters)
        onFilterChange(newFilters);  // Clear selections and pass it up
    };


    return (
        <BlurFade delay={0.1} inView >
            <aside className='w-[250px] border rounded-[8px] p-5 shadow-xl mr-3 hidden xl:block'>

                <nav className='space-y-4 divide-y'>
                    {/* Group Filters */}
                    <div className="space-y-4 pt-4">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-[16px]">Group by</h2>
                            {selectedFilters.group.length > 0 && (
                                <Button onClick={() => clearSelections("group")} className="!p-0 h-4 w-4">
                                    <X />
                                </Button>
                            )}
                        </div>
                        {filters.group.map((item, index) => (

                            <div className="flex items-center space-x-2 rounded-md" key={index}>
                                <Checkbox
                                    id={`group-${item}`}
                                    checked={selectedFilters.group.includes(item)}
                                    onCheckedChange={() => handleFilterChange("group", item)}
                                />
                                <label
                                    htmlFor={`group-${item}`}
                                    className="text-sm font-medium leading-none cursor-pointer"
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </label>
                            </div>

                        ))}
                    </div>

                    {/* Platform Filters */}
                    <div className="space-y-4 pt-4">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-[16px]">Platform by</h2>
                            {selectedFilters.platform.length > 0 && (
                                <Button onClick={() => clearSelections("platform")} className="!p-0 h-4 w-4">
                                    <X />
                                </Button>
                            )}
                        </div>

                        <Reorder.Group
                            axis="y"
                            values={filters.platform}
                            onReorder={(newOrder) =>
                                setFilters((prev) => ({ ...prev, platform: newOrder }))
                            }
                            className="space-y-4"
                        >
                            {filters.platform.map((item) => (
                                <Reorder.Item key={item.id} value={item} className="cursor-pointer">
                                    <div className="flex items-center space-x-2 rounded-md">
                                        <label htmlFor={`platform-${item.id}`} className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox
                                                id={`platform-${item.id}`}
                                                checked={selectedFilters.platform.includes(item.id)}
                                                onCheckedChange={() => handleFilterChange("platform", item.id)}
                                            />
                                            <Image src={item.icon} alt={item.name} width={20} height={20} />
                                            <span className="text-sm font-medium leading-none">{item.name}</span>
                                        </label>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </nav>
            </aside>
        </BlurFade>
    );
};

export default Sidebar;
