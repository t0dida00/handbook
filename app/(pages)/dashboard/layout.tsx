import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useTheme } from 'next-themes'
import ThemeChanger from '@/components/ThemeChanger';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Toaster, toast } from 'sonner'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <div className='relative min-h-screen w-full'>
            <Toaster className='max-w-[200px]' position="bottom-center" />
            <header className=' text-white p-4 flex justify-center items-center w-full border-b-[1px] border-[#e5e7eb]'>
                <div className='text-center'>

                    <img src="./icons/facebook.svg"></img>

                </div>
            </header>
            <div className='absolute right-5 bottom-5 hover:opacity-50 transition-opacity duration-300 z-[99]'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <ThemeChanger />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Theme</p>
                    </TooltipContent>
                </Tooltip>

            </div>
            {children}
        </div>


    );
};

export default DashboardLayout;