"use client"
import React, {Fragment, useState, useEffect} from 'react';
import styles from './sharedfiles.module.css';
import Navbar from "../../components/Navbar/Navbar";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";
import Menu from "@/components/Menu/Menu";
import Modal from "@/components/Preview/preview";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import FileTable from "@/components/file-table/file-table";

const SharedFilesLayout = () => {

    const [data, setData] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const handleFileClick = (file) => {
        setFile(file);
        setModalOpen(true);
    }

    useEffect(() => {
        fetch(`${baseUrl}api/files/shared`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setData(data)
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
                {modalOpen && <Modal file={file} setOpenModal={setModalOpen}/>}
                <div className={styles['main-content']}>
                    <div className={styles['search-bar']} onClick={() => router.push("/search")}>
                        <input className={styles['search-input']} placeholder="Search" disabled={true}/>
                    </div>

                    <div className={styles.sharedfiles}>
                        {data?.files?.length > 0
                            ? <p className={styles.sharedfilesfont}>Your shared files</p>
                            : <p className={styles.sharedfilesfont}>No shared files found</p>}
                    </div>

                    <FileTable
                        data={data}
                        downloadMenu
                        removeShareMenu
                        handleFileClick={handleFileClick}
                    />


                </div>
            </div>
        </Fragment>
    );
};

export default SharedFilesLayout;
