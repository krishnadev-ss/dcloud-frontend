"use client";
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import {toast} from "react-hot-toast";

function Navbar() {
    const router = useRouter();

    const onLogout = () => {
        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <div className={styles['left-side']}>
            <div className={styles['profile-photo']}>
                <img src="/avatar.png" alt="Profile Photo" />
            </div>
            <div>
                <button onClick={() => router.push('/mycloud')} className={`${styles.button1} ${styles.home}`}>My Cloud</button>
                <button onClick={() => router.push('/shared')} className={`${styles.button1} ${styles.home}`}>Shared Files</button>
                <button onClick={() => router.push('/favourites')} className={`${styles.button1} ${styles.home}`}>Favorites</button>
                <button onClick={() => router.push('/upload')} className={`${styles.button1} ${styles.home}`}>Upload Files</button>
            </div>
            <div className={styles.leftbuttonbottom} >
                <button className={styles.button2} onClick={() => router.push('/profile')}>Profile</button>
                <button className={styles.button2} onClick={onLogout}>Log out</button>
            </div>
        </div>
    );
}

export default Navbar;
