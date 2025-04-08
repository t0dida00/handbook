// Datatable.tsx
'use client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ContactIcons from '@/components/ContactIcons';
import { BlurFade } from '@/components/magicui/blur-fade';
import { UserEdition } from './UserEdition';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { DeleteButton } from './UserDeletion';
import { Modal } from './Modal';

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

interface DatatableProps {
    users: User[];
}
let debounceTimeout: NodeJS.Timeout;

const Datable: React.FC<DatatableProps> = ({ users }) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const renderClientName = (item: User) =>
        <span onClick={() => setSelectedUser(item)} className="cursor-pointer hover:underline" >
            {item.name}
        </span >;
    const renderAvatar = (item: User) => (
        <Avatar className='size-10'>
            <AvatarImage src={item.image || undefined} alt={item.name} />
            <AvatarFallback className="flex items-center justify-center rounded-full bg-gray-200 text-center text-sm text-gray-600">
                {item.name.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
    const renderContacts = (item: User) => <ContactIcons contacts={item.contacts} />;
    const renderIndex = (_data: User, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;
    const renderAction = (item: User) => (
        <div className='flex gap-2 flex-row items-center'>
            <UserEdition user={item} />
            <DeleteButton user={item} />
        </div>
    );

    const renderNickname = (item: User) => (
        <span className='truncate max-w-[200px] block' >{item.nickname}</span>
    );

    // Function to filter users by name
    const handleSearchChange = (query: string) => {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            if (query === '') {
                return setFilteredUsers([]);
            }

            const filtered = users.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.nickname.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredUsers(filtered);
        }, 300); // Wait 300ms after user stops typing
    };

    return (
        <div className='w-full'>
            {selectedUser && (
                <Modal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
            <BlurFade delay={0.1} inView className='space-y-5'>
                <SearchBar onSearchChange={handleSearchChange} />
                <DataTable value={filteredUsers.length > 0 ? filteredUsers : users} paginator paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
                    currentPageReportTemplate={`{first} - {last} / {totalRecords}`} rows={10} id="productsTable">
                    <Column field="code" header="#" body={renderIndex} />
                    <Column field="image" header="Avatar" body={renderAvatar} />
                    <Column field="name" header="Name" sortable body={renderClientName} />
                    <Column field="nickname" header="Nickname" body={renderNickname} />
                    <Column header="Contacts" body={renderContacts} />
                    <Column field="quantity" header="" body={renderAction} />
                </DataTable>
            </BlurFade>
        </div>
    );
};

export default Datable;