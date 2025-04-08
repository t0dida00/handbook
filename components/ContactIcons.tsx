interface ContactIconsProps {
    contacts: Record<string, string | null | undefined>;
}

interface IconProps {
    src: string;
    alt: string;
    href?: string | null | undefined;
    title?: string;
    isDisabled?: boolean;
}

const Icon: React.FC<IconProps> = ({ src, alt, href, title, isDisabled }) => (
    <a
        href={href || "#"}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className={isDisabled ? "pointer-events-none opacity-50 grayscale" : ""}
    >
        <img
            src={src}
            alt={alt}
            className="w-5 h-5 transition-transform duration-200 md:hover:scale-150"
        />
    </a>
);

const ContactIcons: React.FC<ContactIconsProps> = ({ contacts }) => {
    const sortedEntries = Object.entries(contacts).sort(([, urlA], [, urlB]) => {
        // Available icons (non-null, non-undefined) should come first
        if (urlA && !urlB) return -1;
        if (!urlA && urlB) return 1;
        return 0;
    });
    return (
        <div className="flex gap-2 items-end">
            {sortedEntries.map(([key, url]) => {
                const iconSrc = `/icons/${key}.svg`;
                const isDisabled = !url;
                return (
                    <Icon
                        key={key}
                        src={iconSrc}
                        alt={key}
                        href={url}
                        title={key}
                        isDisabled={isDisabled}
                    />
                );
            })}
        </div>
    );
};

export default ContactIcons;