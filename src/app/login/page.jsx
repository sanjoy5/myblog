"use client"
import React from 'react';
import styles from "./loginPage.module.css"
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginPage = () => {

    const { data, status } = useSession()
    const router = useRouter()
    console.log(data, status);
    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }
    if (status === 'authenticated') {
        router.push('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div onClick={() => signIn("google")} className={styles.socialButton}>Sign in with Google</div>
                <div className={styles.socialButton}>Sign in with Github</div>
                <div className={styles.socialButton}>Sign in with Facebook</div>
            </div>
        </div>
    );
};

export default LoginPage;