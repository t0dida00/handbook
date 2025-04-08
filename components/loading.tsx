import React from 'react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

const Loading: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-md z-20">
            <OrbitingCircles iconSize={40}>
                <Icons.linkedIn />
                <Icons.facebook />
                <Icons.instagram />
                <Icons.telegram />
                <Icons.whatsapp />
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                <Icons.whatsapp />
                <Icons.emai />
                <Icons.phone />
                <Icons.telegram />
            </OrbitingCircles>
        </div>
    );
};
const Icons = {
    linkedIn: () => (
        <img src="/icons/linkedin.svg" alt="linkedin" />
    ),
    facebook: () => (
        <img src="/icons/facebook.svg" alt="facebook" />
    ),
    instagram: () => (
        <img src="/icons/instagram.svg" alt="instagram" />
    ),
    telegram: () => (
        <img src="/icons/telegram.svg" alt="telegram" />
    ),
    whatsapp: () => (
        <img src="/icons/whatsapp.svg" alt="whatsapp" />
    ),
    emai: () => (
        <img src="/icons/email.svg" alt="email" />
    ),
    phone: () => (
        <img src="/icons/phone.svg" alt="phone" />
    ),
};
export default Loading;