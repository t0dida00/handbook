'use client'
import React, { useState } from 'react'
import styles from "./style.module.scss"
import { signIn } from "next-auth/react";
import Image from 'next/image';
import { BlurFade } from '@/components/magicui/blur-fade';
import Loading from '@/components/loading';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    // const { data: session, status: sessionStatus } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const toggleActive = () => {
        setIsActive(!isActive);
    };

    // if (session) {
    //     return (
    //         <div className='h-screen w-full flex items-center justify-center'>Loading...</div>
    //     )
    // }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push("/dashboard");


        }, 2000);

    }

    return (
        <div className='h-screen w-full flex justify-center items-center pr-8 pl-8 relative '>
            {isLoading &&
                <Loading />
            }
            <BlurFade delay={0.1}>
                <div className={`${styles.container} relative overflow-hidden  ${isActive ? styles.active : ''}`} id="container">
                    <div className={`${styles.formContainer} relative overflow-hidden rounded-[30px] ${styles.signUp}`}>
                        <form action="#" onSubmit={onSubmit}>
                            <h1>Create Account</h1>
                            <div className={styles.socialIcons}>
                                <a href="#" className={styles.icon} onClick={() => signIn('google')}>
                                    <Image src="/icons/google-logo.svg" alt="Google Logo" width={48} height={48} />
                                </a>
                            </div>
                            <span>or use your email for register</span>
                            <input type="text" placeholder="Full Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            {/* <button type="submit">Sign Up
                                <BorderBeam size={35} colorFrom='#fff' colorTo='#F5F5F7' />
                                <BorderBeam size={35} colorFrom='#fff' colorTo='#F5F5F7' delay={39} />
                            </button> */}
                            <PulsatingButton type='submit' className='bg-[var(--light-blue-2)] text-white'>Sign Up</PulsatingButton>
                        </form>
                    </div>
                    <div className={`${styles.formContainer}  relative overflow-hidden rounded-[30px] ${styles.signIn}`}>
                        <form action="#" onSubmit={onSubmit}>
                            <h1>Sign In</h1>
                            <div className={styles.socialIcons}>
                                <a href="#" className={styles.icon} onClick={() => signIn('google')}>
                                    <Image src="/icons/google-logo.svg" alt="Google Logo" width={48} height={48} />
                                </a>
                            </div>
                            <span>or use your email and password</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forgot Password?</a>
                            {/* <button type="submit">Sign In
                                <BorderBeam size={35} colorFrom='#fff' colorTo='#F5F5F7' />
                                <BorderBeam size={35} colorFrom='#fff' colorTo='#F5F5F7' delay={39} />

                            </button> */}
                            <PulsatingButton type='submit' className='bg-[var(--light-blue-2)] text-white'>Sign In</PulsatingButton>
                        </form>
                    </div>

                    <div className={styles.toggleContainer}>
                        <div className={styles.toggle}>
                            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of the site features.</p>
                                <button className={`${styles.hidden} ${styles.button}`} onClick={toggleActive}>Sign In</button>
                            </div>

                            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                                <h1>Hello, Subscriber!</h1>
                                <p>Register with your personal details to use all of the site features.</p>
                                <button className={`${styles.hidden} ${styles.button}`} onClick={toggleActive}>Sign Up</button>
                            </div>
                        </div>
                    </div>

                </div>
            </BlurFade >

        </div >
    );
}

export default LoginPage