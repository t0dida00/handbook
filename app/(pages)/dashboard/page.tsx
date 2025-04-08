'use client'
import { useEffect, useState } from 'react';
import { ProductService } from '@/app/services/ProductService';

import Datable from '@/components/Datatable';
import Sidebar from '@/components/Sidebar';
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
export default function Dashboard() {

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

    useEffect(() => {
        ProductService.getProducts().then(data => setUsers(data));
    }, []);
    const handleFilterChange = (filters: { group: string[]; platform: string[] }) => {
        // setSelectedFilters(filters);
        console.log(filters)
        let filtered = users;
        // Filter by group
        if (filters.group.length > 0) {
            filtered = filtered.filter(user =>
                filters.group.includes(user.category)
            );
        }

        // Filter by platform
        if (filters.platform.length > 0) {
            filtered = filtered.filter(user =>
                filters.platform.every(platform =>
                    user.contacts[platform as keyof typeof user.contacts]
                )
            );
        }
        setFilteredUsers(filtered);
    };

    return (
        <div className=' xl:container xl:mx-auto mb-10'>
            <div className=" flex flex-col md:flex-row justify-center  items-start mx-auto p-5">
                {/* <div className='max-w-[300px]'>
                    <UserProfile />
                </div> */}
                <Sidebar onFilterChange={handleFilterChange} />
                <Datable users={filteredUsers ? filteredUsers : users} />
            </div>
        </div>



    )
}
