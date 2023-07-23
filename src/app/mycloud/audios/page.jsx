"use client"
import React, {Fragment, useState, useEffect} from 'react';
import styles from './audio.module.css';
import Navbar from "@/components/Navbar/Navbar";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";

function FavoritesLayout() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}api/files`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.success)
                    setData(data.audios)
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }, [])



    return (
        <Fragment>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles['main-content']}>
                    {/* Main content in the middle */}
                    <div className={styles['search-bar']}>
                        <input type="text" className={styles['search-input']} placeholder="Search" />
                    </div>

                    <div className={styles.favorites}>
                        <button className={styles['favorites-button']}>
                            <img src="/mycloud/audio.png" alt="Button Image" />
                            <div className={styles['favorites-button-text']}>
                                <p className={styles['favorites-button-text-name']}>Audio</p>
                                <p className={styles['favorites-button-text-number']}>{`${data?.total} Files`}</p>
                            </div>
                        </button>
                    </div>

                    <div className={styles.files}>
                        <p className={styles['files-font']}>Files</p>
                        {data?.files.map((file, index) => (
                            <button key={index} className={styles['files-buttons']}>
                                <img src={file.url} alt="Profile Photo" />
                                <p className={styles.filename}>{file.name.slice(0, 15)}...</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default FavoritesLayout;