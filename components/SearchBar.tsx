// SearchBar.tsx
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value); // Pass the updated search query to the parent
        setSearchQuery(e.target.value); // Update local state if needed
    };
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="relative flex items-center ">
            <Input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search a name"
                className="pl-8"
            />
            <Search className="absolute left-2 text-gray-500" />
        </div>
    );
}
