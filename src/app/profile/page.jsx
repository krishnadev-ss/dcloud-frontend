"use client"
import React, {Fragment, useEffect, useState} from 'react';
import Navbar from "@/components/Navbar/Navbar";
import styles from "./profile.module.css";
import Link from "next/link";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";

const Page = () => {

    const [user, setUser] = useState();

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            navigate("/login");
        }

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
                    setUser(data.user);
                } else {
                    toast("Please login to continue")
                    router.push("/login");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }, [user]);

    return (
        <Fragment>
            <Navbar/>
                <div className={styles.container}>
                <div className={styles['main-content']}>
                    <div className={styles.profile}>
                        <h2>My Profile</h2>
                        <div className={styles.profileDetails}>
                            <div className={styles.profileDetailsLeft}>
                                <img src={user?.avatar?.url} alt={user?.name} />
                                {/*<Link to="/profile/update">*/}
                                    <button>Edit Profile</button>
                                {/*</Link>*/}
                            </div>
                            <div className={styles.profileDetailsRight}>
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user?.name}</p>
                                </div>
                                <div>
                                    <h4>Email Address</h4>
                                    <p>{user?.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>
                                        {String(user?.createdAt).substring(8, 10)}-
                                        {String(user?.createdAt).substring(5, 7)}-
                                        {String(user?.createdAt).substring(0, 4)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Page;
