"use client";
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/navigation';
import styles from './Navbar.module.css';
import {toast} from "react-hot-toast";
import {baseUrl} from "@/app/api/api";

function Navbar() {

    const router = useRouter();

    const [avatar, setAvatar] = useState("/avatar.png");

    useEffect(() => {
        fetch(`${baseUrl}api/auth/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAvatar(data.user.avatar.url);
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [avatar]);


    const onLogout = () => {
        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <div className={styles['left-side']}>
            <div className={styles['profile-photo']}>
                <Image width={50} height={50} src={avatar} alt="Profile Photo"/>
            </div>
            <div>
                <button onClick={() => router.push('/mycloud')} className={`${styles.button1} ${styles.home}`}>My
                    Cloud
                </button>
                <button onClick={() => router.push('/shared')} className={`${styles.button1} ${styles.home}`}>Shared
                    Files
                </button>
                <button onClick={() => router.push('/favourites')}
                        className={`${styles.button1} ${styles.home}`}>Favorites
                </button>
                <button onClick={() => router.push('/upload')} className={`${styles.button1} ${styles.home}`}>Upload
                    Files
                </button>
            </div>
            <div className={styles.leftbuttonbottom}>
                <button className={styles.button2} onClick={() => router.push('/profile')}>Profile</button>
                <button className={styles.button2} onClick={onLogout}>Log out</button>
            </div>
        </div>
    );
}

export default Navbar;
