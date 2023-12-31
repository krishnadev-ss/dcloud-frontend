"use client"
import React, {Fragment, useState, useEffect} from 'react';
import styles from './pictures.module.css';
import Navbar from "@/components/Navbar/Navbar";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";
import Menu from "@/components/Menu/Menu";
import Modal from "@/components/Preview/preview";
import Image from "next/image";

function FavoritesLayout() {

    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const handleFileClick = (file) => {
        setFile(file);
        setModalOpen(true);
    }


    useEffect(() => {
        fetch(`${baseUrl}api/files`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                    setData(data.images)
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
                {modalOpen && <Modal file={file} setOpenModal={setModalOpen} />}
                <div className={styles['main-content']}>
                    {/* Main content in the middle */}
                    <div className={styles['search-bar']} onClick={() => router.push("/search")}>
                        <input className={styles['search-input']} placeholder="Search" disabled={true}/>
                    </div>

                    <div className={styles.favorites}>
                        <button className={styles['favorites-button']}>
                            <Image width={50} height={50} src="/mycloud/camera.png" alt="Button Image"/>
                            <div className={styles['favorites-button-text']}>
                                <p className={styles['favorites-button-text-name']}>Pictures</p>
                                <p className={styles['favorites-button-text-number']}>{`${data?.total} files`}</p>
                            </div>
                        </button>
                    </div>

                    <div className={styles.files}>
                        <p className={styles['files-font']}>Files</p>
                        {data?.files.map((file, index) => (
                            <button key={index} className={styles['files-buttons']} title={file.name}>
                                <img src={file.url} alt="Profile Photo" style={{cursor: "pointer"}}
                                     onClick={() => handleFileClick(file)}/>
                                <div style={{display: "flex"}}>
                                    <p className={styles.filename}>{file.name.slice(0, 13)}... </p>
                                    <Menu cid={file.cid}
                                          id={file._id}
                                          isFavorite={file.isFavorite}
                                          downloadMenu={true}
                                          shareMenu={true}
                                          deleteMenu={true}
                                          favoriteMenu={true}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default FavoritesLayout;
