"use client"
import React, {Fragment, useEffect, useState} from 'react';
import styles from './mycloud.module.css';
import Navbar from "../../components/Navbar/Navbar";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Modal from "@/components/Preview/preview";
import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FileTable from "@/components/file-table/file-table";

const HomePageLayout = () => {

    const router = useRouter();

    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);


    useEffect(() => {
        fetch(`${baseUrl}api/files`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data)
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }, [])

    const handleFileClick = (file) => {
        setFile(file);
        setModalOpen(true);
    }

    return (
        <Fragment>
            <Navbar/>
            <div className={styles.container}>
                {modalOpen && <Modal file={file} setOpenModal={setModalOpen}/>}
                <div className={styles['main-content']}>
                    <div className={styles['search-bar']} onClick={() => router.push("/search")}>
                        <input className={styles['search-input']} placeholder="Search" disabled={true}/>
                    </div>
                    <div className={styles.filecategories}>
                        <p>Categories</p>
                        <button className={styles.pic} onClick={() => router.push("/mycloud/pictures")}>
                            <Image width={50} height={50} src="/mycloud/camera.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Pictures</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.image} files</p>
                            </div>
                        </button>
                        <button className={styles.doc} onClick={() => router.push("/mycloud/documents")}>
                            <Image width={50} height={50} src="/mycloud/documents.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Documents</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.document} files</p>
                            </div>
                        </button>
                        <button className={styles.vid} onClick={() => router.push("/mycloud/videos")}>
                            <Image width={50} height={50} src="/mycloud/video.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Videos</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.video} files</p>
                            </div>
                        </button>
                        <button className={`${styles.aud}`} onClick={() => router.push("/mycloud/audios")}>
                            <Image width={50} height={50} src="/mycloud/audio.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Audio</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.audio} files</p>
                            </div>
                        </button>
                        <button className={`${styles.other}`} onClick={() => router.push("/mycloud/others")}>
                            <Image width={50} height={50} src="/mycloud/others.png" alt="Button Image"/>
                            <div className={styles['filecategories-text']}>
                                <p className={styles['filecategories-text-name']}>Others</p>
                                <p className={styles['filecategories-text-number']}>{data?.count?.other} files</p>
                            </div>
                        </button>
                    </div>
                    <div className={styles.recentfiles}>
                        <p className={styles.recentflcapt}>Recent files</p>

                        <FileTable
                            data={data}
                            downloadMenu
                            shareMenu
                            favoriteMenu
                            deleteMenu
                        />


                    </div>
                </div>


                <div className={styles['right-side']}>
                    <div className={styles['right-content']}>
                        <div className={styles['right-group']}>
                            <div className={styles.addfl}>
                                <button style={{cursor: "pointer"}} className={styles.addfiles}
                                        onClick={() => router.push("/upload")}>
                                    <Image width={50} height={50} src="/mycloud/addfiles.png" alt="Upload Icon"
                                           className={styles['upload-icon']}/>
                                    <div className={styles.label}>Add new files</div>
                                </button>
                            </div>
                            <div className={styles.rectanglestorage}>
                                <div className={styles['stor-flex-container']}>
                                    <p className={styles.stor}>Your storage</p>
                                    <div className={styles['stor-flex-grow']}></div>
                                </div>
                                <div className={styles['storage-meter']}>
                                    <p className={styles.stor} style={{fontWeight: 'normal'}}>
                                        {data?.storageInGB.toFixed(3)} GB Used
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePageLayout;
