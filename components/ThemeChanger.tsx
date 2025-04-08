'use client'
import { useTheme } from 'next-themes'
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { BorderBeam } from './magicui/border-beam';

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Button
            variant="outline"
            type="button"
            size="icon"
            className="px-2 overflow-hidden relative "
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
            <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
            <BorderBeam duration={8} size={30} />
        </Button>
    );
}

export default ThemeChanger